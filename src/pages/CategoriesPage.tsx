
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { categories } from "@/data/mock-data";
import { CategoryCard } from "@/components/CategoryCard";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Categorias</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              icon={category.icon}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
