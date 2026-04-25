import { Button } from "@/components/Elements";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Headphones } from "phosphor-react";

export const LandingPage = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              BasketBay
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple shopping for everyday products.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Discover products quickly, view details clearly, and buy with
              confidence. BasketBay is built for a clean, fast, and smooth
              shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="inverse"
                size="lg"
                onClick={() => navigate("/auth/login")}
              >
                Continue
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-900">
                  Fast Browse
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Find products in seconds.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-900">Clean UI</p>
                <p className="mt-1 text-sm text-slate-600">
                  Minimal and easy to use.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-900">
                  Smooth Flow
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Simple login and checkout flow.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Featured Product
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-900">
                      Wireless Headphones
                    </h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                    New
                  </span>
                </div>

                <div className="mt-6 h-56 rounded-2xl border border-dashed border-slate-200 bg-slate-100">
                  <Headphones
                    size={48}
                    className="mx-auto mt-20 text-slate-400"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Starting from</p>
                    <p className="text-2xl font-bold text-slate-900">$49</p>
                  </div>
                  <Button variant="inverse" size="lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {children && <div className="mt-10">{children}</div>}
      </div>
    </div>
  );
};
