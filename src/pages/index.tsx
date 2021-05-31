import { NextPage } from 'next'

const HomePage: NextPage = () => (
  <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div className="flex-shrink-0"></div>
    <div>
      <div className="text-xl font-medium text-black">
        Welcome to CoffeeChat
      </div>
      <p className="text-gray-500">This is work in progress</p>
    </div>
  </div>
)

export default HomePage
