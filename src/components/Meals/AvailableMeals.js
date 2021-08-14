import React, {useEffect, useState} from "react";

import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-backend-cf21f-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok) {
        throw new Error(`smth went wrong \n ${response.status}`)
      }

      const data = await response.json()
      const loadedMeals = []

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

      fetchMeals().then(() => console.log('all is ok')).catch(e => {
        setIsLoading(false)
        setHttpError(e.message)
        console.log(e.status + e.message)
      })

  }, [])

  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  if (isLoading) {
    return (
      <section className={classes.load}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals