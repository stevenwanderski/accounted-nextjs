export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-24">
      <div className="grid gap-12">
        <div>
          <h1 className="text-7xl leading-tight font-bold">Accounted.</h1>

          <p className="max-w-[520px] text-xl font-normal">
            A budgeting tool that ensures you have enough money in your accounts each month.
          </p>
        </div>

        <div className="flex gap-8">
          <a href="#" className="btn">Sign Up</a>
          <a href="#" className="btn">Log In</a>
        </div>
      </div>
    </div>
  );
}
