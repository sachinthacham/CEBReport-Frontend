import ceblogo from "../assets/ceb-wave.png";
import Login from "../pages/Login";

export default function LoginLayout() {
  return (
    <main>
      <section className="relative w-full min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-x-0 bottom-0 w-full"
          style={{
            backgroundImage: `url(${ceblogo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto", // full width, auto height
            height: "400px", // adjust height as needed
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>

        <Login />
      </section>
    </main>
  );
}
