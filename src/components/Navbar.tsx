import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
            <img className="h-8 w-8 mr-2" src="https://img.icons8.com/ios/50/laptop--v1.png" alt="Logo"/>
            <span className="font-bold text-xl text-green-400">GeekWear</span>
            </div>

        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-green-400">Inicio</a>
          <a href="#" className="hover:text-green-400">Productos</a>
          <a href="#" className="hover:text-green-400">Ofertas</a>
          <a href="#" className="hover:text-green-400">Contacto</a>
        </div>

        
        <div className="flex items-center space-x-4">
          <a href="#"><img className="h-6 w-6" src="https://img.icons8.com/ios-filled/50/ffffff/search.png" alt="Buscar"/></a>
          <a href="#"><img className="h-6 w-6" src="https://img.icons8.com/ios-filled/50/ffffff/shopping-cart.png" alt="Carrito"/></a>
          <a href="#"><img className="h-6 w-6" src="https://img.icons8.com/ios-filled/50/ffffff/user.png" alt="Usuario"/></a>
        </div>

        
        <div className="md:hidden">
          <button id="menu-btn" className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    
    <div id="mobile-menu" className="md:hidden hidden px-4 pb-4">
      <a href="#" className="block py-2 hover:text-green-400">Inicio</a>
      <a href="#" className="block py-2 hover:text-green-400">Productos</a>
      <a href="#" className="block py-2 hover:text-green-400">Ofertas</a>
      <a href="#" className="block py-2 hover:text-green-400">Contacto</a>
    </div>
  </nav>

  )
}

export default Navbar