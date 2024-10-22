import { db, collection, getDocs } from "../firebase-config";

export async function getRecipe() {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
    return recipes;
  } catch (e) {
    console.error(e);
  }
}

export async function getRecipe(recipeId){
    try {
        console.log(recipeId);
    } catch(e) {
        console.error(e);
    }
};
