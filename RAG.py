import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

class RAGService:
    def __init__(self):
        self.vector_store = None
        self.chain = None
        
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        self.llm = ChatGroq(
            temperature=0.3, 
            model_name="llama-3.1-8b-instant", 
            api_key=os.getenv("GROQ_API_KEY")
        )

    def load_index(self):
        print("📂 Loading FAISS index...")
        try:
            self.vector_store = FAISS.load_local(
                folder_path=".", 
                embeddings=self.embeddings,
                allow_dangerous_deserialization=True 
            )
            
            # --- 1. Define Retriever ---
            retriever = self.vector_store.as_retriever(search_kwargs={"k": 3})

            # --- 2. Define Prompt ---
            template = """You are a compassionate and helpful maternal health assistant. 
            Answer the user's question using ONLY the context provided below.
            
            If the context focuses on specific conditions (like HIV or diabetes), preface your advice by saying "If you have [condition]..." rather than assuming the user has it.
            If the answer is not in the context, say "I don't have enough information in my documents to answer that specifically."

            <context>
            {context}
            </context>

            User Question: {question}
            """
            prompt = ChatPromptTemplate.from_template(template)

            # --- 3. Helper to format docs ---
            def format_docs(docs):
                return "\n\n".join(doc.page_content for doc in docs)

            # --- 4. Build LCEL Chain ---
            # This runs retrieval, then passes the docs + question to the LLM
            # It returns a dictionary containing the Answer AND the Source Context
            self.chain = (
                RunnableParallel({"context": retriever, "question": RunnablePassthrough()})
                .assign(answer=(
                    RunnablePassthrough.assign(
                        context=lambda x: format_docs(x["context"])
                    )
                    | prompt
                    | self.llm
                    | StrOutputParser()
                ))
            )
            
            print("✅ RAG System Ready (LCEL Mode).")
            
        except Exception as e:
            print(f"❌ Error loading index: {e}")
            self.chain = None

    def ask(self, query: str):
        if not self.chain:
            return {"error": "RAG index is not loaded."}
        
        # Invoke the chain
        response = self.chain.invoke(query)
        
        # 'response' is now a dict: {'context': [docs], 'question': '...', 'answer': '...'}
        return {
            "answer": response["answer"],
            "sources": [doc.metadata.get('source', 'Unknown') for doc in response["context"]]
        }

rag_service = RAGService()