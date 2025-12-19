import { useState } from 'react';
import {
  Baby,
  Calendar,
  Heart,
  Activity,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import { motion } from 'motion/react';

interface TimelinePhase {
  trimester: number;
  weeks: string;
  title: string;
  icon: typeof Baby;
  color: string;
  bgColor: string;
  milestones: string[];
  checkups: string[];
  warnings: string[];
  babyDevelopment: string;
}

const timelineData: TimelinePhase[] = [
  {
    trimester: 1,
    weeks: '1-12 weeks',
    title: 'First Trimester',
    icon: Heart,
    color: '#2BB4A0',
    bgColor: '#2BB4A0',
    milestones: [
      'Pregnancy confirmed',
      'Morning sickness may begin',
      'Fatigue and breast tenderness',
      'Rapid hormonal changes',
    ],
    checkups: [
      'Initial prenatal visit (6-8 weeks)',
      'Blood tests and urine tests',
      'Dating ultrasound',
      'Folic acid supplementation',
    ],
    warnings: [
      'Avoid alcohol and smoking',
      'Take prescribed folic acid',
      'Report severe vomiting',
      'Watch for vaginal bleeding',
    ],
    babyDevelopment:
      "Baby's organs, heart, and nervous system begin forming. By 12 weeks, baby is about 2 inches long.",
  },
  {
    trimester: 2,
    weeks: '13-26 weeks',
    title: 'Second Trimester',
    icon: Baby,
    color: '#2BB4A0',
    bgColor: '#2BB4A0',
    milestones: [
      'Energy levels improve',
      'Baby movements felt (quickening)',
      'Visible baby bump develops',
      'Reduced nausea',
    ],
    checkups: [
      'Anatomy scan (18-22 weeks)',
      'Blood pressure monitoring',
      'Glucose screening test',
      'Iron supplementation if needed',
    ],
    warnings: [
      'Monitor blood pressure regularly',
      'Report reduced fetal movement',
      'Watch for signs of preeclampsia',
      'Maintain healthy diet',
    ],
    babyDevelopment:
      "Baby can hear sounds, suck thumb, and develop sleep patterns. By 26 weeks, baby weighs about 2 lbs.",
  },
  {
    trimester: 3,
    weeks: '27-40 weeks',
    title: 'Third Trimester',
    icon: Stethoscope,
    color: '#2BB4A0',
    bgColor: '#2BB4A0',
    milestones: [
      'Braxton Hicks contractions',
      'Increased discomfort',
      'Frequent urination',
      'Preparing for delivery',
    ],
    checkups: [
      'Weekly visits from 36 weeks',
      'Monitor fetal position',
      'Group B strep test',
      'Birth plan discussion',
    ],
    warnings: [
      'Count daily fetal movements',
      'Report signs of preterm labor',
      'Watch for water breaking',
      'Know when to go to hospital',
    ],
    babyDevelopment:
      "Baby's lungs mature, brain develops rapidly. Baby gains weight for delivery, reaching 6-9 lbs by 40 weeks.",
  },
];

const weekByWeekHighlights = [
  { week: 4, event: 'Missed period, pregnancy test positive' },
  { week: 8, event: "Baby's heart beating, first ultrasound" },
  { week: 12, event: 'End of first trimester, risk of miscarriage drops' },
  { week: 20, event: "Anatomy scan, can learn baby's sex" },
  { week: 24, event: 'Baby can survive with medical help if born' },
  { week: 28, event: 'Baby opens eyes, can sense light' },
  { week: 32, event: 'Baby practices breathing movements' },
  { week: 36, event: 'Baby is considered early term' },
  { week: 40, event: 'Due date - ready for birth!' },
];

export default function PregnancyTimeline() {
  const [selectedTrimester, setSelectedTrimester] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState(20);

  return (
    <div
      style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '32px 16px 48px',
        backgroundColor: '#FDF7F2',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '12px',
            backgroundColor: 'rgba(43,180,160,0.1)',
            borderRadius: '999px',
            marginBottom: '24px',
          }}
        >
          <Calendar style={{ width: 48, height: 48, color: '#2BB4A0' }} />
        </div>
        <h1
          style={{
            color: '#111827',
            marginBottom: '16px',
            fontSize: '28px',
            fontWeight: 600,
          }}
        >
          Pregnancy Journey Timeline
        </h1>
        <p style={{ color: '#374151', maxWidth: '768px', margin: '0 auto' }}>
          Track the amazing 40-week journey of pregnancy. A visual guide for expecting mothers and ASHA workers
          to understand key milestones, checkups, and development stages.
        </p>
      </div>

      {/* Current Week Calculator */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          padding: '24px',
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 600,
          }}
        >
          Track Current Week
        </h2>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <label
            style={{
              display: 'block',
              color: '#374151',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Select current week of pregnancy: Week {currentWeek}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={currentWeek}
            onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '12px',
              borderRadius: '999px',
              appearance: 'none',
              cursor: 'pointer',
              background: `linear-gradient(to right, #2BB4A0 0%, #2BB4A0 ${
                (currentWeek / 40) * 100
              }%, #E5E7EB ${(currentWeek / 40) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              color: '#6B7280',
              fontSize: '12px',
            }}
          >
            <span>Week 1</span>
            <span>Week 40</span>
          </div>

          {/* Current Status */}
          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: 'rgba(43,180,160,0.1)',
              borderRadius: '12px',
              border: '2px solid #2BB4A0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Activity
                style={{
                  width: 24,
                  height: 24,
                  color: '#2BB4A0',
                  marginTop: '4px',
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ color: '#111827', marginBottom: '4px', fontWeight: 600 }}>
                  Trimester {currentWeek <= 12 ? '1' : currentWeek <= 26 ? '2' : '3'}
                </p>
                <p style={{ color: '#4B5563', fontSize: '14px' }}>
                  {currentWeek <= 12
                    ? 'First trimester: Critical development period. Focus on prenatal vitamins and early screening.'
                    : currentWeek <= 26
                    ? 'Second trimester: Energy levels improve. Time for anatomy scan and glucose screening.'
                    : 'Third trimester: Preparing for delivery. Regular monitoring and birth preparation.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            color: '#111827',
            marginBottom: '32px',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 600,
          }}
        >
          40-Week Visual Timeline
        </h2>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '32px',
                height: '4px',
                background:
                  'linear-gradient(to right, #2BB4A0, #2BB4A0)',
              }}
            />
            {/* Markers */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
                gap: '24px',
              }}
            >
              {[0, 12, 26, 40].map((week, index) => {
                const active = week <= currentWeek;
                return (
                  <div key={week} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        backgroundColor: active ? '#2BB4A0' : '#E5E7EB',
                        color: active ? '#ffffff' : '#6B7280',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span>{week === 0 ? '1' : week}</span>
                    </div>
                    <p style={{ color: '#374151', fontSize: '14px' }}>
                      {index === 0
                        ? 'Start'
                        : index === 1
                        ? 'Trimester 1'
                        : index === 2
                        ? 'Trimester 2'
                        : 'Birth'}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Current week indicator */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: `${(currentWeek / 40) * 100}%`,
                transform: 'translateX(-50%)',
                transition: 'all 0.3s ease-out',
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#F4A9A2',
                  borderRadius: '999px',
                  border: '4px solid #ffffff',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.15)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trimester Cards */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            color: '#111827',
            marginBottom: '32px',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 600,
          }}
        >
          Journey by Trimester
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          }}
        >
          {timelineData.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedTrimester === phase.trimester;

            return (
              <motion.div
                key={phase.trimester}
                layout
                onClick={() =>
                  setSelectedTrimester(isSelected ? null : phase.trimester)
                }
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: isSelected
                    ? '0 12px 24px rgba(0,0,0,0.12)'
                    : '0 4px 12px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '4px solid #2BB4A0' : 'none',
                  transition: 'box-shadow 0.2s ease,border 0.2s ease',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: '24px',
                    color: '#ffffff',
                    backgroundColor: phase.bgColor,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <Icon style={{ width: 40, height: 40 }} />
                    <span style={{ fontSize: '20px', opacity: 0.9 }}>
                      {phase.weeks}
                    </span>
                  </div>
                  <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>
                    Trimester {phase.trimester}
                  </p>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                  {/* Baby development */}
                  <div
                    style={{
                      marginBottom: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #F3F4F6',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      <Baby style={{ width: 20, height: 20, color: '#2BB4A0' }} />
                      <h4
                        style={{ color: '#111827', fontSize: '16px', fontWeight: 600 }}
                      >
                        Baby Development
                      </h4>
                    </div>
                    <p style={{ color: '#4B5563', fontSize: '14px' }}>
                      {phase.babyDevelopment}
                    </p>
                  </div>

                  {!isSelected ? (
                    <button
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#2BB4A0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      <span>View Details</span>
                      <ChevronRight style={{ width: 16, height: 16 }} />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                      {/* Milestones */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <CheckCircle
                            style={{ width: 20, height: 20, color: '#2BB4A0' }}
                          />
                          <h4
                            style={{
                              color: '#111827',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            Mother&apos;s Milestones
                          </h4>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {phase.milestones.map((m, idx) => (
                            <li
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                color: '#4B5563',
                                fontSize: '14px',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '999px',
                                  backgroundColor: '#2BB4A0',
                                  marginTop: '6px',
                                  flexShrink: 0,
                                }}
                              />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Checkups */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <Stethoscope
                            style={{ width: 20, height: 20, color: '#2BB4A0' }}
                          />
                          <h4
                            style={{
                              color: '#111827',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            Key Checkups
                          </h4>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {phase.checkups.map((c, idx) => (
                            <li
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                color: '#4B5563',
                                fontSize: '14px',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '999px',
                                  backgroundColor: '#2BB4A0',
                                  marginTop: '6px',
                                  flexShrink: 0,
                                }}
                              />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Warnings */}
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <AlertCircle
                            style={{ width: 20, height: 20, color: '#F4A9A2' }}
                          />
                          <h4
                            style={{
                              color: '#111827',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            Important Alerts
                          </h4>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {phase.warnings.map((w, idx) => (
                            <li
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                color: '#4B5563',
                                fontSize: '14px',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '999px',
                                  backgroundColor: '#F4A9A2',
                                  marginTop: '6px',
                                  flexShrink: 0,
                                }}
                              />
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Week-by-Week Highlights */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          padding: '24px',
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            color: '#111827',
            marginBottom: '24px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Key Milestones Week-by-Week
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {weekByWeekHighlights.map((item, index) => {
            const reached = item.week <= currentWeek;
            return (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: reached ? '2px solid #2BB4A0' : '2px solid #E5E7EB',
                  backgroundColor: reached
                    ? 'rgba(43,180,160,0.1)'
                    : '#F9FAFB',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '56px',
                    height: '56px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: reached ? '#2BB4A0' : '#D1D5DB',
                    color: reached ? '#ffffff' : '#4B5563',
                    fontSize: '12px',
                    textAlign: 'center',
                    padding: '4px',
                  }}
                >
                  Week {item.week}
                </div>
                <div style={{ flex: 1, paddingTop: '8px' }}>
                  <p
                    style={{
                      color: reached ? '#111827' : '#6B7280',
                      fontSize: '14px',
                    }}
                  >
                    {item.event}
                  </p>
                </div>
                {reached && (
                  <CheckCircle
                    style={{
                      width: 24,
                      height: 24,
                      color: '#2BB4A0',
                      marginTop: '8px',
                      flexShrink: 0,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Risk Traffic-light Cards */}
      {/* Green */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            color: '#111827',
            textAlign: 'center',
            marginBottom: '16px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Pregnancy Risk Classification Guide
        </h2>
        <p
          style={{
            color: '#4B5563',
            textAlign: 'center',
            marginBottom: '32px',
            maxWidth: '768px',
            marginInline: 'auto',
          }}
        >
          Use these visual cards to quickly identify and communicate risk levels during pregnancy. Show these to mothers
          and their families for clear understanding.
        </p>

        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          }}
        >
          {/* Green card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              border: '4px solid #22C55E',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(to bottom right,#22C55E,#16A34A)',
                padding: '24px',
                color: '#ffffff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>🟢</span>
                </div>
                <Shield style={{ width: 48, height: 48, opacity: 0.8 }} />
              </div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>
                Low Risk - Safe
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Normal pregnancy progression
              </p>
            </div>
            <div style={{ padding: '24px' }}>
              <h4
                style={{
                  color: '#111827',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                Indicators:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {[
                  'Normal blood pressure (< 120/80)',
                  'Blood sugar in normal range',
                  'No concerning symptoms',
                  'Regular fetal movements',
                  'All tests within normal limits',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '8px',
                      color: '#4B5563',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    <CheckCircle
                      style={{
                        width: 16,
                        height: 16,
                        color: '#22C55E',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  backgroundColor: 'rgba(34,197,94,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px solid rgba(34,197,94,0.3)',
                }}
              >
                <h4
                  style={{
                    color: '#111827',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Action for ASHA:
                </h4>
                <p style={{ color: '#374151', fontSize: '14px' }}>
                  Continue routine prenatal care. Schedule regular checkups. Encourage healthy diet, rest, and prenatal
                  vitamins.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Yellow card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              border: '4px solid #EAB308',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(to bottom right,#EAB308,#CA8A04)',
                padding: '24px',
                color: '#ffffff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>🟡</span>
                </div>
                <AlertTriangle style={{ width: 48, height: 48, opacity: 0.8 }} />
              </div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>
                Medium Risk - Monitor
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Requires close monitoring
              </p>
            </div>
            <div style={{ padding: '24px' }}>
              <h4
                style={{
                  color: '#111827',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                Warning Signs:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {[
                  'Blood pressure 120-139/80-89',
                  'Borderline blood sugar levels',
                  'Mild swelling in hands/feet',
                  'History of previous complications',
                  'Age under 18 or over 35',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '8px',
                      color: '#4B5563',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    <AlertTriangle
                      style={{
                        width: 16,
                        height: 16,
                        color: '#EAB308',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  backgroundColor: 'rgba(234,179,8,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px solid rgba(234,179,8,0.3)',
                }}
              >
                <h4
                  style={{
                    color: '#111827',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Action for ASHA:
                </h4>
                <p style={{ color: '#374151', fontSize: '14px' }}>
                  Increase monitoring frequency. Check vital signs weekly. Refer to ANM or PHC. Track symptoms
                  carefully.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Red card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
              border: '4px solid #EF4444',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(to bottom right,#EF4444,#DC2626)',
                padding: '24px',
                color: '#ffffff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>🔴</span>
                </div>
                <AlertCircle style={{ width: 48, height: 48, opacity: 0.8 }} />
              </div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: 600 }}>
                High Risk - Urgent
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Immediate medical attention needed
              </p>
            </div>
            <div style={{ padding: '24px' }}>
              <h4
                style={{
                  color: '#111827',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                Danger Signs:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {[
                  'Blood pressure ≥ 140/90',
                  'High blood sugar (diabetes)',
                  'Severe headache or vision changes',
                  'Vaginal bleeding',
                  'No fetal movement for 12+ hours',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '8px',
                      color: '#4B5563',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    <AlertCircle
                      style={{
                        width: 16,
                        height: 16,
                        color: '#EF4444',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '2px solid rgba(239,68,68,0.3)',
                }}
              >
                <h4
                  style={{
                    color: '#111827',
                    marginBottom: '8px',
                    fontWeight: 600,
                  }}
                >
                  Action for ASHA:
                </h4>
                <p style={{ color: '#374151', fontSize: '14px' }}>
                  <span style={{ display: 'block', marginBottom: '4px' }}>
                    ⚠️ IMMEDIATE REFERRAL REQUIRED
                  </span>
                  Contact doctor immediately. Arrange transport to hospital. Do not delay. This is a medical emergency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick reference */}
        <div
          style={{
            marginTop: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            padding: '24px',
          }}
        >
          <h3
            style={{
              color: '#111827',
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Quick Reference: When to Use Each Card
          </h3>
          <div
            style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(34,197,94,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <span style={{ fontSize: '24px' }}>🟢</span>
              <div>
                <p style={{ color: '#111827', marginBottom: '4px', fontWeight: 500 }}>
                  Show Green Card
                </p>
                <p style={{ color: '#4B5563', fontSize: '14px' }}>
                  When all vitals are normal and mother feels well
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(234,179,8,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(234,179,8,0.2)',
              }}
            >
              <span style={{ fontSize: '24px' }}>🟡</span>
              <div>
                <p style={{ color: '#111827', marginBottom: '4px', fontWeight: 500 }}>
                  Show Yellow Card
                </p>
                <p style={{ color: '#4B5563', fontSize: '14px' }}>
                  When there are mild symptoms or borderline readings
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(239,68,68,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <span style={{ fontSize: '24px' }}>🔴</span>
              <div>
                <p style={{ color: '#111827', marginBottom: '4px', fontWeight: 500 }}>
                  Show Red Card
                </p>
                <p style={{ color: '#4B5563', fontSize: '14px' }}>
                  When there are serious symptoms requiring urgent care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational note */}
      <div
        style={{
          marginTop: '32px',
          backgroundColor: 'rgba(244,169,162,0.1)',
          borderRadius: '16px',
          border: '2px solid #F4A9A2',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <AlertCircle
            style={{
              width: 24,
              height: 24,
              color: '#F4A9A2',
              marginTop: '4px',
              flexShrink: 0,
            }}
          />
          <div>
            <h3
              style={{
                color: '#111827',
                marginBottom: '8px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Important Note for ASHA Workers
            </h3>
            <p style={{ color: '#374151', fontSize: '14px' }}>
              Every pregnancy is unique. This timeline provides general guidance only. Always refer mothers to qualified
              healthcare providers for medical advice, prenatal care, and any concerns. Regular checkups are essential
              for a healthy pregnancy outcome.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
