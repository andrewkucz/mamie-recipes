import { Link, Route, Switch } from 'wouter'
import recipes from './recipes.json'

type Recipe = {
  name: string
  slug: string
  ingredients: string[]
  directions: string[]
}

const allRecipes = recipes as Recipe[]

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold">Mamie&apos;s Recipes</h1>
        <p className="mt-3 text-xl">
          Select a recipe to view the full instructions.
        </p>
      </header>
      <ul className="space-y-4 text-lg">
        {allRecipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/${recipe.slug}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 text-xl">
      <h1 className="text-2xl font-semibold">Recipe not found</h1>
      <Link href="/" className="mt-6 inline-flex">
        Back to all recipes
      </Link>
    </main>
  )
}

function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = allRecipes.find((item) => item.slug === params.slug)

  if (!recipe) {
    return (<NotFoundPage />);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 text-xl">
      <header className="mb-6">
        <Link href="/" className="inline-flex">
          ← Back to all recipes
        </Link>
        <h1 className="mt-6 text-3xl font-semibold">{recipe.name}</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Directions</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5">
          {recipe.directions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}



function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/:slug" component={RecipePage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default App
