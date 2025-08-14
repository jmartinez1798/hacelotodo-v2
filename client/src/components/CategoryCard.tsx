import { Link } from "wouter";

interface CategoryCardProps {
  name: string;
  icon: string;
  slug: string;
}

export default function CategoryCard({ name, icon, slug }: CategoryCardProps) {
  return (
    <Link href={`/explore?category=${slug}`}>
      <div className="text-center group cursor-pointer">
        <div className="bg-slate-100 rounded-2xl p-6 group-hover:bg-primary-50 transition-colors">
          <i className={`${icon} text-3xl text-primary-600 mb-4`}></i>
          <h3 className="font-semibold text-slate-900">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
