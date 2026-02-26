import React from 'react'
import Antigravity from './Antigravity'

import BlurText from './BlurText'
import { TextGenerateEffect } from './ui/text-generate-effect'
import AnimatedContent from './AnimatedContent'
import { Badge } from './ui/badge'

const LandingPageHeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 1. The Background Effect */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#5227FF"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* 2. The Foreground Text */}
      <div className="relative z-10 text-center ">
        <AnimatedContent
  distance={100}
  direction="vertical"
  reverse={false}
  duration={0.8}
  ease="power3.out"
  initialOpacity={0}
  animateOpacity
  scale={1}
  threshold={0.1}
  delay={0}
>
 <div className='w-full flex items-center justify-center '> <div style={{background:'oklch(0.61 0.11 222)'}} className='p-2 border-sky-500 rounded-full bg-sky-600 border  w-fit'><h3>Official MITS Gwalior Portal</h3></div></div>
</AnimatedContent>
<BlurText
  text="Welcome to the MITS NOC Management System"
  delay={200}
  animateBy="words"
  direction="top"
  className="text-4xl mb-8 font-bold text-center"
/>
      </div>
    </section>
  )
}

export default LandingPageHeroSection