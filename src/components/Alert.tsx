import type { AlertMessage } from '../types/types'

interface AlertProps {
  alert: AlertMessage; 
}

const Alert = ({alert}:AlertProps) => {
  
  return (
    <div className={`${alert.color} uppercase p-2 font-bold text-center rounded-lg`}>
      {alert.message}
    </div>
  )
}

export default Alert