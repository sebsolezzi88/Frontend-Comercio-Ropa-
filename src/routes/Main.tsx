import React from 'react'

const Main = () => {
  return (
   <main className="p-4 text-center bg-gray-900 text-white">
    <h1 className="text-3xl font-bold mb-4">¡Bienvenido a GeekStore!</h1>
    <p className="text-lg">
        Vendemos <strong>remeras</strong> y <strong>buzos</strong> con temática geek inspirada en
        <span className="text-green-400 font-semibold">programación</span> y sistemas operativos como
        <span className="text-blue-400 font-semibold">Windows</span> y
        <span className="text-red-400 font-semibold">Linux</span>.
    </p>
</main>
  )
}

export default Main