import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";

export default function Searchpage() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const searchQuery = searchParams.get('keyword')

    useEffect(() => {
        getData();
    }, []);
    const [data, setData] = useState();

    const getData = async () => {
        const response = await fetch('http://localhost:3000/product/search/' + searchQuery);
        const data = await response.json();
        setData(data); console.log(data)
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap gap-5 justify-center">
            {data ? data.map((item) => {
                    return (
                        <div key={item.id} className='p-5 max-w-sm bg-slate-100 flex flex-col'>

                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src={item.image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {item.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{item.kategori}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{item.harga}</p>
                            </div>

                        </div>
                    )
                }) : "loading"}
            </div>
        </>
    )
}