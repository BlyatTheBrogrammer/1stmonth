import React from 'react';
import { useState, useEffect, useMemo } from 'react';
const LOVE_REASONS = [
    { text: "You are my inner peace. When nobody believes in me, you are there supporting me.", bear: true, bearPos: 'left' },
    { text: "My love for you could never end. It only grows like an exponential function.", bear: true, bearPos: 'right' },
    { text: "You're the crazy princess that can match my craziness.", bear: true, bearPos: 'left' },
    { text: "Even though you're already starting to get bald and white hair from my extreme stuff, you still love me 😂", bear: true, bearPos: 'right' },
    { text: "My heart is only for you. Your love has filled it up, and your warmth keeps me running every day through everything.", bear: true, bearPos: 'left' },
    { text: "Even though I am sleepy at the end of the day, you're the only face I want to see no matter what.", bear: true, bearPos: 'right' },
    { text: "I love you because you helped me so much. Without you, I wouldn't find my sparkle again and never return from that burnout.", bear: true, bearPos: 'left' },
    { text: "I love you because you conquered both my whole cardiac and nervous systems. There's no hour when I am not thinking about you.", bear: true, bearPos: 'right' },
    { text: "I love you because you know how to cook well 😂", bear: true, bearPos: 'left' },
    { text: "I love you more than you do. If you calculate who sent more hearts in the last week, I am the winner for sure 💕", bear: true, bearPos: 'right' }
];

const LIFE_REASONS = [
    { text: "I wanna spend the rest of my life with you so I could see every day an angel like you.", bear: true, bearPos: 'left' },
    { text: "I wanna spend my life with you because you're gonna cook for me everything I order you to cook haha", bear: true, bearPos: 'right' },
    { text: "I wanna spend my entire life with you because I wanna explore the entire Earth with you.", bear: true, bearPos: 'left' },
    { text: "I love you so much because without your smile, my brain could live. It's like you're the light of the sun.", bear: true, bearPos: 'right' },
    { text: "I love you because you kinda stole me 💕", bear: true, bearPos: 'left' },
    { text: "I love you because at the end of the day, you still choose me no matter what.", bear: true, bearPos: 'right' },
    { text: "I just wanted to add that I miss you so much.", bear: true, bearPos: 'left' },
    { text: "I love you because without you, my days would not be so bright.", bear: true, bearPos: 'right' },
    { text: "I love you because you support me so much and I couldn't never thank you enough for it.", bear: true, bearPos: 'left' },
    { text: "I love you because you're my home.", bear: true, bearPos: 'right' }
];

function AnimatedBear({ position }) {
    return (
        <div className={`bear ${position}`}>
            🧸
        </div>
    );
}

function Confetti() {
    const pieces = useMemo(() =>
            Array.from({ length: 60 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 3 + Math.random() * 1.5,
                emoji: ['💕', '❤️', '💗', '✨', '🧸'][Math.floor(Math.random() * 5)]
            })),
        []
    );

    return (
        <div className="confetti-container">
            {pieces.map(p => (
                <div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.left}%`,
                        animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
                        fontSize: '28px'
                    }}
                >
                    {p.emoji}
                </div>
            ))}
        </div>
    );
}

function TeaseQuestion({ onAnswer }) {
    const [answer, setAnswer] = useState('');
    const [showWrong, setShowWrong] = useState(false);

    const handleSubmit = () => {
        setShowWrong(true);
        setTimeout(() => onAnswer(), 1200);
    };

    return (
        <div className="tease-section">
            <div className="tease-card">
                <h2 className="tease-title">What do you think this is? 🤔</h2>
                <p className="tease-subtitle">Take a guess, cutie...</p>

                <div className="tease-input-wrap">
                    <input
                        type="text"
                        placeholder="Your guess..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        className="tease-input"
                        autoFocus
                    />
                    <button className="tease-submit" onClick={handleSubmit}>
                        →
                    </button>
                </div>

                {showWrong && (
                    <p className="wrong-answer">You are wrong 😂💕</p>
                )}
            </div>
        </div>
    );
}

function ReasonsSlideshow({ reasons, title, onNext }) {
    const [current, setCurrent] = useState(0);
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        setShowNext(false);
        const timer = setTimeout(() => setShowNext(true), 900);
        return () => clearTimeout(timer);
    }, [current]);

    const handleNext = () => {
        if (current < reasons.length - 1) {
            setCurrent(current + 1);
        } else {
            onNext();
        }
    };

    const reason = reasons[current];

    return (
        <div className="reasons-section">
            <div className="reason-card">
                <p className="reason-number">
                    {current + 1} / {reasons.length}
                </p>

                <h3 className="reason-title">{title}</h3>

                <div className="reason-content">
                    {reason.bear && reason.bearPos === 'left' && (
                        <AnimatedBear position="left" />
                    )}

                    <p className="reason-text">{reason.text}</p>

                    {reason.bear && reason.bearPos === 'right' && (
                        <AnimatedBear position="right" />
                    )}
                </div>

                <div className="reason-dots">
                    {reasons.map((_, i) => (
                        <div
                            key={i}
                            className={`dot ${i === current ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {showNext && (
                <button className="reason-btn" onClick={handleNext}>
                    {current < reasons.length - 1 ? 'Next' : 'Continue'} →
                </button>
            )}
        </div>
    );
}

function Celebration() {
    return (
        <div className="celebration">
            <Confetti />
            <div className="celebration-content">
                <p className="celebrate-emoji">💕</p>
                <h1>I am always gonna love you</h1>
                <p className="celebrate-sub">sweetheart no matter what</p>
                <p className="celebrate-hearts">💕 ❤️ 💗 ✨ 🧸 💕</p>
            </div>
        </div>
    );
}

export default function AnniversaryApp() {
    const [stage, setStage] = useState('tease');

    const CSS = `
    * { box-sizing: border-box; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Playfair Display', serif;
      background: linear-gradient(135deg, #150a0d 0%, #2a121a 50%, #4a1f29 100%);
      color: #f8ecec;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .tease-section {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .tease-card {
      max-width: 500px;
      background: linear-gradient(180deg, rgba(42,18,26,0.95), rgba(21,10,13,0.98));
      border: 2px solid rgba(217,180,92,0.4);
      border-radius: 25px;
      padding: 50px 40px;
      text-align: center;
      animation: slideIn 0.8s ease;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .tease-title {
      font-size: 28px;
      color: #f6d9de;
      margin: 0 0 12px;
    }

    .tease-subtitle {
      font-size: 16px;
      color: rgba(248,236,236,0.7);
      margin: 0 0 30px;
      font-style: italic;
    }

    .tease-input-wrap {
      display: flex;
      gap: 12px;
      animation: fadeIn 0.8s ease 0.3s both;
    }

    .tease-input {
      flex: 1;
      padding: 14px 16px;
      background: rgba(255,255,255,0.08);
      border: 1.5px solid #d9b45c;
      border-radius: 12px;
      color: #f8ecec;
      font-family: inherit;
      font-size: 15px;
      transition: all 0.3s;
    }

    .tease-input:focus {
      outline: none;
      border-color: #e0405a;
      background: rgba(255,255,255,0.12);
      box-shadow: 0 0 15px rgba(224,64,90,0.2);
    }

    .tease-submit {
      padding: 14px 28px;
      background: linear-gradient(135deg, #c4122e, #8b0018);
      border: none;
      border-radius: 12px;
      color: #f6d9de;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
    }

    .tease-submit:hover {
      transform: scale(1.08);
      box-shadow: 0 0 20px rgba(224,64,90,0.4);
    }

    .wrong-answer {
      margin-top: 20px;
      font-size: 18px;
      color: #d9b45c;
      animation: slideIn 0.6s ease;
    }

    .reasons-section {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .reason-card {
      max-width: 600px;
      background: linear-gradient(180deg, rgba(42,18,26,0.95), rgba(21,10,13,0.98));
      border: 2px solid rgba(217,180,92,0.4);
      border-radius: 25px;
      padding: 40px;
      text-align: center;
      animation: slideIn 0.8s ease;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .reason-number {
      font-size: 13px;
      color: #d9b45c;
      margin: 0 0 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .reason-title {
      font-size: 20px;
      color: #f6d9de;
      margin: 0 0 30px;
      font-weight: 500;
    }

    .reason-content {
      position: relative;
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      margin-bottom: 30px;
    }

    .bear {
      font-size: 60px;
      animation: bounce 1.5s ease-in-out infinite;
    }

    .bear.left {
      animation-delay: 0s;
    }

    .bear.right {
      animation-delay: 0.5s;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0) rotate(-5deg); }
      50% { transform: translateY(-15px) rotate(5deg); }
    }

    .reason-text {
      font-size: 18px;
      color: #f8ecec;
      line-height: 1.8;
      margin: 0;
      animation: fadeIn 0.8s ease 0.2s both;
      flex: 1;
    }

    .reason-dots {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-top: 20px;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgba(217,180,92,0.3);
      transition: all 0.3s;
    }

    .dot.active {
      background: #e0405a;
      transform: scale(1.3);
    }

    .reason-btn {
      margin-top: 30px;
      padding: 14px 36px;
      background: linear-gradient(135deg, #c4122e, #8b0018);
      color: #f6d9de;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s;
      animation: fadeIn 0.6s ease;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .reason-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(224,64,90,0.3);
    }

    .celebration {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .confetti-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .confetti-piece {
      position: fixed;
      top: -50px;
      animation: fall 3s linear forwards;
    }

    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }

    .celebration-content {
      text-align: center;
      z-index: 10;
      animation: slideIn 0.8s ease;
    }

    .celebrate-emoji {
      font-size: 80px;
      margin: 0 0 20px;
      animation: pulse 1s ease infinite;
    }

    .celebration-content h1 {
      font-size: 42px;
      margin: 0 0 12px;
      color: #e0405a;
      line-height: 1.3;
    }

    .celebrate-sub {
      font-size: 28px;
      color: #f6d9de;
      margin: 0 0 30px;
      font-style: italic;
    }

    .celebrate-hearts {
      font-size: 36px;
      margin: 0;
      animation: pulse 1.2s ease infinite;
      letter-spacing: 8px;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
  `;

    return (
        <div style={{ background: 'linear-gradient(135deg, #150a0d 0%, #2a121a 50%, #4a1f29 100%)', minHeight: '100vh' }}>
            <style>{CSS}</style>

            {stage === 'tease' && <TeaseQuestion onAnswer={() => setStage('love')} />}
            {stage === 'love' && <ReasonsSlideshow reasons={LOVE_REASONS} title="Why I Love You" onNext={() => setStage('life')} />}
            {stage === 'life' && <ReasonsSlideshow reasons={LIFE_REASONS} title="Why I Wanna Spend My Life With You" onNext={() => setStage('celebration')} />}
            {stage === 'celebration' && <Celebration />}
        </div>
    );
}