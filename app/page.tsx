import SocialsButton from "@/components/SocialsButton";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import historyData from "@/public/history/history.json";
import skillsData from "@/public/skills.json";
import certsData from "@/public/certifications.json";
import { Timeline } from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import type { Certs, HistoryEntry, Skill } from "@/lib/types";
import Certifications from "@/components/Certifications";

const SOCIALS = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/martin-ho-zy/",
    icon: FaLinkedin,
  },
  {
    name: "Github",
    link: "https://github.com/minimartzz",
    icon: FaGithub,
  },
  {
    name: "Medium",
    link: "https://medium.com/@minimartzz",
    icon: FaMedium,
  },
  {
    name: "Resume",
    link: "/documents/resume.pdf",
    icon: IoDocument,
  },
];

const entries = historyData as HistoryEntry[];
const skills = skillsData as Skill[];
const certs = certsData as Certs[];

const Home = () => {
  return (
    <div>
      {/* Profile */}
      <div className="flex-center flex-col sm:flex-row mt-10 gap-5 mb-10">
        <div className="rounded-full h-60 w-60 overflow-hidden border-2 border-gray-600">
          <Image
            src="/profile.png"
            alt="Profile Picture"
            width={1080}
            height={1080}
            loading="eager"
          />
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start gap-2">
          <h1 className="font-bold text-4xl">Martin Ho</h1>
          <p className="italic font-semibold text-gray-500 text-xl">
            "Passionate about data. Focused on delivery."
          </p>
          <p className="text-gray-400 text-md">
            MSc Applied Data Science @ UMich
          </p>
          <div className="flex gap-2 mt-3">
            {SOCIALS.map((social) => (
              <SocialsButton key={social.name} {...social} />
            ))}
          </div>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col p-5 sm:p-20 gap-y-15">
        {/* Bio */}
        <div>
          <h2 className="font-bold text-3xl mb-6">bio</h2>
          <p>
            Martin Ho is a Data Scientist and avid app builder. He has
            previously worked for Singtel under the specialist management
            program holding different positions as a{" "}
            <b>Machine Learning Engineer, Data Engineer and Tech Consultant</b>{" "}
            He has expertise in implementing production-ready data applications
            as seen from his varied experience across the data pipeline. He is
            also an avid learner, teaching himself various tools like web
            development, LLM architectures and agentic AI. As a builder, he is
            not afraid to fail, recovers quickly and makes meaningful
            contributions.
          </p>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-bold text-3xl mb-6">experience</h2>
          <Timeline entries={entries} />
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-bold text-3xl mb-6">skills</h2>
          <Skills skills={skills} />
        </div>

        {/* Certifications */}
        <div>
          <h2 className="font-bold text-3xl mb-6">certifications</h2>
          <Certifications certs={certs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
