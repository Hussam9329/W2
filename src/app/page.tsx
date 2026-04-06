'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, BookOpen, Lightbulb, Gamepad2, Lock, Eye, EyeOff } from 'lucide-react'

const APP_PASSWORD = '2007'

export default function RhamTerritoryHome() {
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordShake, setPasswordShake] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const auth = localStorage.getItem('riham_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    if (passwordInput === APP_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('riham_auth', 'true')
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPasswordShake(true)
      setTimeout(() => setPasswordShake(false), 500)
    }
  }

  // شاشة كلمة المرور
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative" dir="rtl">
        <div className="fixed inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <polygon points="150,50 250,200 50,200" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="350,30 450,180 250,180" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="600,80 700,230 500,230" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="850,20 950,170 750,170" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="100,300 200,450 0,450" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="400,350 500,500 300,500" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="700,300 800,450 600,450" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <polygon points="1000,250 1100,400 900,400" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <circle cx="250" cy="200" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="450" cy="180" r="2" fill="#38bdf8" opacity="0.6" />
            <circle cx="700" cy="230" r="2" fill="#38bdf8" opacity="0.7" />
            <circle cx="950" cy="170" r="2" fill="#38bdf8" opacity="0.5" />
            <circle cx="500" cy="500" r="2" fill="#38bdf8" opacity="0.8" />
          </svg>
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <AnimatePresence>
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full max-w-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <Lock className="w-10 h-10 text-sky-400" />
                    <div className="absolute inset-0 w-10 h-10 bg-sky-400/30 blur-xl rounded-full" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-3xl sm:text-4xl font-bold mb-2 text-center tracking-tight"
                >
                  <span className="bg-gradient-to-l from-sky-400 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                    Rham
                  </span>{' '}
                  <span className="bg-gradient-to-l from-cyan-400 via-sky-500 to-sky-600 bg-clip-text text-transparent">
                    Territory
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-center text-neutral-500 mb-8 text-sm"
                >
                  أدخل كلمة المرور للدخول
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, x: passwordShake ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false) }}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="كلمة المرور"
                      dir="ltr"
                      className={`w-full h-12 text-center text-lg bg-[#0c1a2e] border ${passwordError ? 'border-red-500/50' : 'border-sky-500/20'} focus:border-sky-500 rounded-xl text-white placeholder-neutral-600 outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs text-center"
                    >
                      كلمة المرور غير صحيحة
                    </motion.p>
                  )}

                  <button
                    onClick={handleLogin}
                    className="w-full h-12 bg-gradient-to-br from-sky-500 to-cyan-600 hover:from-sky-400 hover:to-cyan-500 text-white font-bold rounded-xl transition-all duration-300"
                  >
                    دخول
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative" dir="rtl">
      {/* شبكة هندسية خلفية */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <polygon points="150,50 250,200 50,200" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="350,30 450,180 250,180" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="600,80 700,230 500,230" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="850,20 950,170 750,170" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="100,300 200,450 0,450" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="400,350 500,500 300,500" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="700,300 800,450 600,450" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="1000,250 1100,400 900,400" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="250,500 350,650 150,650" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="550,550 650,700 450,700" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <polygon points="850,500 950,650 750,650" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          <line x1="200" y1="180" x2="400" y2="350" stroke="url(#grad1)" strokeWidth="0.3" />
          <line x1="450" y1="180" x2="700" y2="300" stroke="url(#grad1)" strokeWidth="0.3" />
          <line x1="700" y1="230" x2="950" y2="170" stroke="url(#grad1)" strokeWidth="0.3" />
          <line x1="200" y1="450" x2="300" y2="500" stroke="url(#grad1)" strokeWidth="0.3" />
          <line x1="500" y1="500" x2="600" y2="450" stroke="url(#grad1)" strokeWidth="0.3" />
          <line x1="800" y1="450" x2="750" y2="500" stroke="url(#grad1)" strokeWidth="0.3" />
          <circle cx="250" cy="200" r="2" fill="#38bdf8" opacity="0.8" />
          <circle cx="450" cy="180" r="2" fill="#38bdf8" opacity="0.6" />
          <circle cx="700" cy="230" r="2" fill="#38bdf8" opacity="0.7" />
          <circle cx="950" cy="170" r="2" fill="#38bdf8" opacity="0.5" />
          <circle cx="500" cy="500" r="2" fill="#38bdf8" opacity="0.8" />
          <circle cx="800" cy="450" r="2" fill="#38bdf8" opacity="0.6" />
          <circle cx="200" cy="450" r="2" fill="#38bdf8" opacity="0.7" />
          <circle cx="650" cy="700" r="2" fill="#38bdf8" opacity="0.5" />
        </svg>

        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-sky-400 rounded-full animate-pulse" />
        <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[70%] right-[25%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[45%] right-[40%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] left-[40%] w-1 h-1 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        
        {/* الشعار */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center mb-6 sm:mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex justify-center mb-4 sm:mb-6"
              >
                <div className="relative">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400" />
                  <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-sky-400/30 blur-xl rounded-full" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 tracking-tight"
              >
                <span className="bg-gradient-to-l from-sky-400 via-sky-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                  Rham
                </span>
                <span className="bg-gradient-to-l from-cyan-400 via-sky-500 to-sky-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  Territory
                </span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="w-20 sm:w-32 h-[1px] mx-auto mb-3 sm:mb-5 bg-gradient-to-l from-transparent via-sky-500 to-transparent"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] text-sky-400/70 font-light"
              >
                PRECISION ANALYTICS &bull; STRATEGIC FORESIGHT
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* بطاقات التطبيقات */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 w-full max-w-4xl"
            >
              {/* بطاقة أريد مشاهدته */}
              <motion.a
                href="/archive"
                onHoverStart={() => setHoveredCard('archive')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-sky-500/20 bg-gradient-to-b from-[#0c1a2e] to-[#081322] p-3 sm:p-6 text-center transition-all duration-300 touch-active backdrop-blur-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent transition-opacity duration-300 ${hoveredCard === 'archive' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute -inset-1 bg-gradient-to-b from-sky-500/20 to-cyan-500/20 blur-xl transition-opacity duration-300 rounded-xl sm:rounded-2xl ${hoveredCard === 'archive' ? 'opacity-50' : 'opacity-0'}`} />
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotateY: hoveredCard === 'archive' ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-5 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-400/15 to-cyan-400/10 border border-sky-500/25 shadow-lg shadow-sky-500/10"
                  >
                    <BookOpen className="w-6 h-6 sm:w-11 sm:h-11 text-sky-400" />
                  </motion.div>

                  <h3 className="text-sm sm:text-2xl font-bold mb-0.5 sm:mb-2 bg-gradient-to-l from-sky-300 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                    أريد مشاهدته
                  </h3>
                  <p className="text-[11px] sm:text-sm text-neutral-400 leading-relaxed hidden sm:block">
                    تتبع أفلامك ومسلسلاتك وأنمياتك
                  </p>

                  <motion.div
                    animate={{ x: hoveredCard === 'archive' ? -5 : 0 }}
                    className="mt-2 sm:mt-4 flex items-center justify-center gap-1 text-sky-400 text-xs sm:text-sm"
                  >
                    <span>ادخل الآن</span>
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </div>
              </motion.a>

              {/* بطاقة أريد قرائته */}
              <motion.a
                href="/books"
                onHoverStart={() => setHoveredCard('books')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-blue-500/20 bg-gradient-to-b from-[#0c1a2e] to-[#081322] p-3 sm:p-6 text-center transition-all duration-300 touch-active backdrop-blur-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent transition-opacity duration-300 ${hoveredCard === 'books' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-sky-500/20 blur-xl transition-opacity duration-300 rounded-xl sm:rounded-2xl ${hoveredCard === 'books' ? 'opacity-50' : 'opacity-0'}`} />
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotateY: hoveredCard === 'books' ? -5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-5 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500/15 to-sky-500/10 border border-blue-500/25 shadow-lg shadow-blue-500/10"
                  >
                    <BookOpen className="w-6 h-6 sm:w-11 sm:h-11 text-blue-400" />
                  </motion.div>

                  <h3 className="text-sm sm:text-2xl font-bold mb-0.5 sm:mb-2 bg-gradient-to-l from-blue-300 via-blue-400 to-sky-500 bg-clip-text text-transparent">
                    أريد قرائته
                  </h3>
                  <p className="text-[11px] sm:text-sm text-neutral-400 leading-relaxed hidden sm:block">
                    تتبع كتبك ومؤلفاتك المفضلة
                  </p>

                  <motion.div
                    animate={{ x: hoveredCard === 'books' ? -5 : 0 }}
                    className="mt-2 sm:mt-4 flex items-center justify-center gap-1 text-blue-400 text-xs sm:text-sm"
                  >
                    <span>ادخل الآن</span>
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </div>
              </motion.a>

              {/* بطاقة أفكاري */}
              <motion.a
                href="/ideas"
                onHoverStart={() => setHoveredCard('ideas')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-cyan-500/20 bg-gradient-to-b from-[#0c1a2e] to-[#081322] p-3 sm:p-6 text-center transition-all duration-300 touch-active backdrop-blur-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent transition-opacity duration-300 ${hoveredCard === 'ideas' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-teal-500/20 blur-xl transition-opacity duration-300 rounded-xl sm:rounded-2xl ${hoveredCard === 'ideas' ? 'opacity-50' : 'opacity-0'}`} />
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotateY: hoveredCard === 'ideas' ? -5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-5 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400/15 to-teal-400/10 border border-cyan-500/25 shadow-lg shadow-cyan-500/10"
                  >
                    <Lightbulb className="w-6 h-6 sm:w-11 sm:h-11 text-cyan-400" />
                  </motion.div>

                  <h3 className="text-sm sm:text-2xl font-bold mb-0.5 sm:mb-2 bg-gradient-to-l from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    أفكاري
                  </h3>
                  <p className="text-[11px] sm:text-sm text-neutral-400 leading-relaxed hidden sm:block">
                    دوّن أفكارك وخطط لمشاريعك المستقبلية
                  </p>

                  <motion.div
                    animate={{ x: hoveredCard === 'ideas' ? -5 : 0 }}
                    className="mt-2 sm:mt-4 flex items-center justify-center gap-1 text-cyan-400 text-xs sm:text-sm"
                  >
                    <span>ادخل الآن</span>
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </div>
              </motion.a>

              {/* بطاقة أريد لعبها */}
              <motion.a
                href="/games"
                onHoverStart={() => setHoveredCard('games')}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-blue-500/20 bg-gradient-to-b from-[#0c1a2e] to-[#081322] p-3 sm:p-6 text-center transition-all duration-300 touch-active backdrop-blur-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent transition-opacity duration-300 ${hoveredCard === 'games' ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-indigo-500/20 blur-xl transition-opacity duration-300 rounded-xl sm:rounded-2xl ${hoveredCard === 'games' ? 'opacity-50' : 'opacity-0'}`} />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotateY: hoveredCard === 'games' ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-5 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-400/15 to-indigo-400/10 border border-blue-400/25 shadow-lg shadow-blue-400/10"
                  >
                    <Gamepad2 className="w-6 h-6 sm:w-11 sm:h-11 text-blue-400" />
                  </motion.div>

                  <h3 className="text-sm sm:text-2xl font-bold mb-0.5 sm:mb-2 bg-gradient-to-l from-blue-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    أريد لعبها
                  </h3>
                  <p className="text-[11px] sm:text-sm text-neutral-400 leading-relaxed hidden sm:block">
                    تتبع ألعابك المفضلة على كل المنصات
                  </p>

                  <motion.div
                    animate={{ x: hoveredCard === 'games' ? -5 : 0 }}
                    className="mt-2 sm:mt-4 flex items-center justify-center gap-1 text-blue-400 text-xs sm:text-sm"
                  >
                    <span>ادخل الآن</span>
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* تذييل */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-8 sm:mt-16 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-neutral-600 text-xs">
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-neutral-700" />
                <span>صنع بواسطة حسام</span>
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-neutral-700" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
