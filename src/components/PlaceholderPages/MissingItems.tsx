import { Link, useNavigate } from "react-router-dom";

export default function NotFound404({ item }: { item: string }) {
  const navigate = useNavigate();
  return (
    <>
      <main className="grid min-h-full place-items-center bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
            {item} Missing
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the resource you are looking for
          </p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Go back to last page
          </button>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Go back home
            </Link>
            <a
              href="mailto:cassius.reynolds.dev@gmail.com"
              className="text-sm font-semibold text-gray-900"
            >
              Contact Support via Email <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
