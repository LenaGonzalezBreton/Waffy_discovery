import Hero from "@/components/Hero";
import GameBoard from "@/components/GameBoard";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-waffy-cream">
      <Hero />
      <GameBoard />
      <div className="h-screen flex items-center justify-center bg-waffy-blue/10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-waffy-blue mb-4">Merci d’avoir pris soin de moi.</h2>
          <p className="text-xl text-gray-600 mb-8">Aide-nous à accompagner tous les chiens.</p>
          <NewsletterForm />
        </div>
      </div>
    </main>
  );
}
