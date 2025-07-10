import { useState } from "react";
import Categories from "../components/Categories";
import Orders from "../components/Orders";
import ProductsForm from "../components/ProductsForm";
import ListaProductos from "../components/ListaProductos";

const Admin = () => {
    const [view, setView] = useState("products");


  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setView("addproducts")} className="text-left text-green-500 uppercase   hover:text-blue-500">Agregar Productos</button>
          <button onClick={() => setView("listproducts")} className="text-left text-green-500 uppercase   hover:text-blue-500">Productos</button>
          <button onClick={() => setView("categories")} className="text-left text-green-500 uppercase  hover:text-blue-500">Categorías</button>
          <button onClick={() => setView("orders")} className="text-left text-green-500 uppercase  hover:text-blue-500">Órdenes</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-600">
        {view === "addproducts" && <ProductsForm />}
        {view === "listproducts" && <ListaProductos />}
        {view === "categories" && <Categories />}
        {view === "orders" && <Orders />}
      </main>
    </div>
  );
  
}

export default Admin