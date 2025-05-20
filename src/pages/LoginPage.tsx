import ceblogo from "../assets/ceb-wave.png";
import LoginCard from "../components/login/LoginCard";

const LoginPage = () => {
  return (
    <main>
      <section className="relative w-full min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-x-0 bottom-0 w-full"
          style={{
            backgroundImage: `url(${ceblogo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            height: "400px",
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>

        <div className="w-full max-w-md px-4 ">
          <LoginCard />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
