import React from 'react'

function Ufooter() {
  return (
    <div><footer className="bg-gray-100 mt-12 py-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Demo Store Notice */}
      <div className="col-span-full mb-8">
        <h2 className="text-2xl font-bold mb-4">EVENT MANAGEMENT</h2>
        <p className="text-gray-600 text-sm">
          This is a demo store by Clean Canvas. All product images remain the sole property 
          of the respective brands and are not for re-use on other stores.
        </p>
      </div>
  
      {/* Delivery & Returns */}
      <div>
        <h3 className="font-semibold mb-4">Delivery & returns</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><a href="#" className="hover:text-orange-500">Shipping information</a></li>
          <li><a href="#" className="hover:text-orange-500">Returns & refunds</a></li>
          <li><a href="#" className="hover:text-orange-500">Track your order</a></li>
          <li><a href="#" className="hover:text-orange-500">Help & FAQs</a></li>
        </ul>
      </div>
  
      {/* About Enterprise */}
      <div>
        <h3 className="font-semibold mb-4">About Enterprise</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><a href="#" className="hover:text-orange-500">About Us</a></li>
          <li><a href="#" className="hover:text-orange-500">Our brands</a></li>
          <li><a href="#" className="hover:text-orange-500">Advice & Reviews</a></li>
          <li><a href="#" className="hover:text-orange-500">Contact us</a></li>
        </ul>
      </div>
  
      {/* Newsletter */}
      <div className="md:col-span-2 lg:col-span-1">
        <h3 className="font-semibold mb-4">Sign up to our newsletter</h3>
        <p className="text-sm text-gray-600 mb-4">
          Sign up for exclusive offers, original stories, events and more.
        </p>
        <form className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your email"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button 
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </footer>
  </div>
  )
}

export default Ufooter