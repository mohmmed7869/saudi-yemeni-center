import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="404 - الصفحة غير موجودة | المركز السعودي اليمني"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة. ارجع إلى الصفحة الرئيسية للمركز السعودي اليمني"
        keywords="404، صفحة غير موجودة، المركز السعودي اليمني"
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">عذراً! الصفحة غير موجودة</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            العودة إلى الصفحة الرئيسية
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
