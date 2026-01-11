import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import JoinSection from '@/components/JoinSection';
import PortalSection from '@/components/PortalSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <JoinSection />
        <PortalSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
