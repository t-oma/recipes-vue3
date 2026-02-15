import { Router } from 'express';
import * as recipeController from '../controllers/recipeController';
import { authenticate } from '../middleware/auth';

const router: Router = Router();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', authenticate, recipeController.createRecipe);

export default router;
