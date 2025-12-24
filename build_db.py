import json
import os
from pathlib import Path
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

def build_index():
    # 1. Start searching from the current folder where you run the script
    current_dir = Path.cwd()
    print(f"📍 Scanning recursively starting from: {current_dir}")

    # 2. Find ALL .json files that have 'batch' in the name, in ANY subfolder
    # The rglob('*') pattern looks into every single subfolder.
    json_files = list(current_dir.rglob("*batch*.json"))
    
    if not json_files:
        print("\n❌ CRITICAL ERROR: No files matching '*batch*.json' were found!")
        print("   Make sure the 'batches' folder is inside the 'tryouts' folder.")
        return

    print(f"📂 Found {len(json_files)} files. Here are the first 3:")
    for f in json_files[:3]:
        print(f"   - {f.name}")

    print("\n🔌 Initializing Embeddings...")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    documents = []
    
    # 3. Process the files
    for file_path in json_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
                # Check for "qa_pairs" key
                if "qa_pairs" not in data:
                    print(f"⚠️  Skipping {file_path.name} (no 'qa_pairs' key found)")
                    continue 

                for item in data.get("qa_pairs", []):
                    # Combine Question & Answer
                    page_content = f"Question: {item['question']}\nAnswer: {item['answer']}"
                    
                    # Fix Metadata
                    meta = item.get("metadata", {}).copy()
                    
                    # Create Source: "Q0001 (antenatal_care)"
                    doc_id = item.get('id', 'Unknown')
                    topic = meta.get('topic', 'General')
                    
                    meta["source"] = f"{doc_id} ({topic})"
                    meta["id"] = doc_id
                    
                    documents.append(Document(page_content=page_content, metadata=meta))
                    
        except Exception as e:
            print(f"❌ Error reading {file_path.name}: {e}")

    if not documents:
        print("❌ No documents found to process.")
        return

    print(f"🧠 Vectorizing {len(documents)} documents... (This will take a moment)")
    
    # 4. Save Index
    vector_store = FAISS.from_documents(documents, embeddings)
    vector_store.save_local(".")
    
    print("✅ Success! Database rebuilt.")

if __name__ == "__main__":
    build_index()