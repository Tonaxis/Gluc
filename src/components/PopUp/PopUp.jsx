import React, { useEffect, useState } from 'react';
import './PopUp.scss'
import axios from 'axios';
import Loader from '../Loader/Loader';

function PopUp({id}) {
    const [food, setFood] = useState();
    const [open, setOpen] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setOpen(id && true)
        if (id) fetchData(id, setFood, setLoading);
    }, [id])

    const handleClose = () => {
        setOpen();
        setFood();
        setLoading(true);
    }

    return (
        open &&
        <div className="background-popup" onClick={handleClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={handleClose}>✖</button>
                <Loader state={loading}>
                    {
                        food &&
                        <>
                            <div className="popup_header">
                                <img src={food.image_url} alt="product" width={50} height={50} />
                                <div className="titles">
                                    <p className="product-name">{food.product_name}</p>
                                    <p className="brands">{food.brands}</p>
                                    <p className="generic-name">{food.generic_name}</p>
                                </div>
                            </div>
                            {
                                food.nutriscore_grade &&
                                <div className={`nutriscore nutriscore-${food.nutriscore_grade}`}>
                                    Nutriscore : <span>{food.nutriscore_grade}</span>
                                </div>
                            }

                            {
                                food.warning &&
                                <div className="warning">
                                    {food.warning}
                                </div>
                            }
                            <details>
                                <summary>Ingrédients</summary>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Estimation</th>
                                            <th>Végan</th>
                                            <th>Végétarien</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {food.ingredients?.map(ingredient =>
                                            <tr>
                                                <td className="name">{ingredient.text}</td>
                                                <td>{ingredient.percent_estimate.toFixed(2)}%</td>
                                                <td>{icon(ingredient.vegan)}</td>
                                                <td>{icon(ingredient.vegetarian)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                {food.image_ingredients_url &&
                                    <details>
                                        <summary>Image</summary>
                                        <img width="100%" src={food.image_ingredients_url} alt="image_ingredients" />
                                    </details>
                                }
                            </details>

                            <details>
                                <summary>Nutriments</summary>
                                <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Valeur</th>
                                        <th>Valeur pour 100g</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="2" className="name">Energie</td>
                                        <td>{food.nutriments['energy-kcal']}{food.nutriments['energy-kcal_unit']}</td>
                                        <td>{food.nutriments['energy-kcal_100g']}{food.nutriments['energy-kcal_unit']}</td>
                                    </tr>
                                    <tr>
                                        <td>({food.nutriments['energy-kj']}{food.nutriments['energy-kj_unit']})</td>
                                        <td>({food.nutriments['energy-kj_100g']}{food.nutriments['energy-kj_unit']})</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2" className="name">Glucides<br /> - Dont sucre</td>
                                        <td>{food.nutriments.carbohydrates}{food.nutriments.carbohydrates_unit}</td>
                                        <td>{food.nutriments.carbohydrates_100g}{food.nutriments.carbohydrates_unit}</td>
                                    </tr>
                                    <tr>
                                        <td>{food.nutriments.sugars}{food.nutriments.sugars_unit}</td>
                                        <td>{food.nutriments.sugars_100g}{food.nutriments.sugars_unit}</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2" className="name">Lipides<br /> - Dont saturés</td>
                                        <td>{food.nutriments.fat}{food.nutriments.fat_unit}</td>
                                        <td>{food.nutriments.fat_100g}{food.nutriments.fat_unit}</td>
                                    </tr>
                                    <tr>
                                        <td>{food.nutriments['saturated-fat']}{food.nutriments['saturated-fat_unit']}</td>
                                        <td>{food.nutriments['saturated-fat_100g']}{food.nutriments['saturated-fat_unit']}</td>
                                    </tr>
                                    <tr>
                                        <td className="name">Fibres</td>
                                        <td>{food.nutriments.fiber}{food.nutriments.fiber_unit}</td>
                                        <td>{food.nutriments.fiber_100g}{food.nutriments.fiber_unit}</td>
                                    </tr>
                                    <tr>
                                        <td className="name">Protéines</td>
                                        <td>{food.nutriments.proteins}{food.nutriments.proteins_unit}</td>
                                        <td>{food.nutriments.proteins_100g}{food.nutriments.proteins_unit}</td>
                                    </tr>
                                    <tr>
                                        <td className="name">Sel</td>
                                        <td>{food.nutriments.salt}{food.nutriments.salt_unit}</td>
                                        <td>{food.nutriments.salt_100g}{food.nutriments.salt_unit}</td>
                                    </tr>
                                    <tr>
                                        <td className="name">Sodium</td>
                                        <td>{food.nutriments.sodium}{food.nutriments.sodium_unit}</td>
                                        <td>{food.nutriments.sodium_100g}{food.nutriments.sodium_unit}</td>
                                    </tr>
                                    <tr>
                                        <td className="name">Alcool</td>
                                        <td>{food.nutriments.alcohol}{food.nutriments.alcohol_unit}</td>
                                        <td>{food.nutriments.alcohol_100g}{food.nutriments.alcohol_unit}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {food.image_nutrition_url &&
                                <details>
                                    <summary>Image</summary>
                                    <img width="100%" src={food.image_nutrition_url} alt="nutrition" />
                                </details>
                            }
                            </details>
                        </>
                    }
                </Loader>
            </div>
        </div>
    );
}

function icon(data) {
    if (data === "yes") return '✔'
    if (data === "no") return '❌'
    return '❔'

}

function fetchData(id, setFood, setLoading) {
    setLoading(true);
    const base = `https://world.openfoodfacts.org/api/v0/product/${id}.json`;
    axios.get(base)
      .then((response) => {
            setFood(response.data.product);
            setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
}

export default PopUp;