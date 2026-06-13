import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import App from './App'

const DONE_KEY = 'bodylog-pro_onboarded_v1'
type Phase = 'splash' | 'onboard' | 'app'

export default function AppWrapper() {
  const [phase, setPhase] = useState<Phase>('splash')
  const features = ["Weight and measurement log", "BMI and body fat tracker", "Progress photo timeline", "Goal setting"]
  return (
    <>
      {phase === 'splash' && <SplashScreen onDone={()=>setPhase(localStorage.getItem(DONE_KEY)?'app':'onboard')} color1="#14b8a6" color2="#0d9488" emoji="💪" name="BodyLog Pro" tagline="Body measurements and fitness progress"/>}
      {phase === 'onboard' && <Onboarding onDone={()=>{localStorage.setItem(DONE_KEY,'1');setPhase('app')}} color1="#14b8a6" emoji="💪" name="BodyLog Pro" features={features}/>}
      {phase === 'app' && <App/>}
    </>
  )
}