import { useNavigate } from 'react-router-dom'

function Navber() {
    const navigate = useNavigate();

    const navbers = [
        { name: "Home", navigate: "/home", icon: "🏠" },
        { name: "Products", navigate: "/all-products", icon: "📦" },
        { name: "Users", navigate: "/all-customer", icon: "👥" },
        { name: "Orders", navigate: "/add-purches", icon: "🛒" },
    ];

    return (
        <aside className='fixed bottom-0 left-0 w-full h-16 bg-white shadow-md'>
            <nav className='flex w-full h-full justify-evenly items-center'>
                {navbers.map((navber, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(navber.navigate)}
                        className="flex flex-col items-center text-gray-600 hover:text-blue-500"
                    >
                        <span className="text-xl">{navber.icon}</span>
                        <span className="text-xs">{navber.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}

export default Navber