import MealItems from "./MealItems";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals(){

    const {
        data : loadMeals,
        isLoading,
        error
    } = useHttp("meals",requestConfig,[]);
    
    if(isLoading){
        return <p className="center">Is Loading ....</p>;
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error}/>
    }

    return(
    <ul id="meals">
    {loadMeals.map((meal)=>(
        <MealItems key = {meal.id} meals={meal}/>
    ))
    }
    </ul>
    )
    
}