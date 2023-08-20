import React, { useEffect, useState } from 'react';
import './Products.scss';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import List from '../List/List';
import Loader from '../Loader/Loader';
import PopUp from '../PopUp/PopUp';

function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [nbPerPage, ] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [id, setId] = useState();

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    };

    useEffect(() => {
      const fetchData = () => {
        setLoading(true);
        const base = `https://world.openfoodfacts.org/cgi/search.pl?json=1&action=process&fields=product_name,id,nutriments,image_url,generic_name,brands${filter && `&search_terms=${filter}`}&page=${page}&page_size=${nbPerPage}`;

        axios.get(base)
          .then((response) => {
            setTotalPages(Math.floor(response.data.count / nbPerPage))
            const merged = response.data.products.map((food) => ({
              id: food.id,
              product_name: food.product_name,
              generic_name: food.generic_name,
              brands: food.brands,
              carbohydrates: food.nutriments.carbohydrates_100g,
              image: food.image_url,
            }));
            setData(
              merged.filter(
                (food) =>
                food.id && food.product_name && food.generic_name && food.carbohydrates
                )
                );

                setLoading(false);
              })
              .catch((error) => {
                console.error('Erreur lors de la récupération des données:', error);
            });
        }
      fetchData();
    }, [filter, nbPerPage, page]);

    return (
      <>
        <div className="sticky">
          <SearchBar setFilter={setFilter} />
          <div className="header">
            <p>Produit</p>
            <p className="glucides">Glucides par 100g</p>
          </div>
        </div>

        <PopUp id={id} />
        <Loader state={loading}>
          <List data={data} setId={setId} />
          <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </Loader>
      </>
    );
}

export default Products;
