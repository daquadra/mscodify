import Image from 'next/image';
import { HiOutlineMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import profileData from '../../data/profile.json';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 px-6 bg-foreground/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Quem <span className="text-primary">Sou Eu</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Foto */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src={profileData.photo}
                alt={profileData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Informações */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">{profileData.name}</h3>
              <p className="text-xl text-primary font-medium mb-4">{profileData.role}</p>
              <p className="text-foreground/70 leading-relaxed">{profileData.bio}</p>
            </div>

            {/* Contato Rápido */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                title="Email"
              >
                <HiOutlineMail className="w-5 h-5" />
                <span className="text-sm">Email</span>
              </a>
              <a
                href={`https://wa.me/${profileData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>

            {/* Redes Sociais */}
            <div>
              <p className="text-sm font-medium mb-3">Redes Sociais</p>
              <div className="flex gap-4">
                {profileData.social.linkedin && (
                  <a
                    href={profileData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                )}
                {profileData.social.github && (
                  <a
                    href={profileData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    title="GitHub"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
