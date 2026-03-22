import { Certs } from "@/lib/types";

const Certifications = ({ certs }: { certs: Certs[] }) => {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {certs.map((cert) => (
        <li key={cert.title}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {cert.title}{" "}
                {cert.progress && (
                  <span className="text-sm rounded-full border border-green-700 bg-green-200 text-green-700 px-2 py-1">
                    In Progress
                  </span>
                )}
              </p>
            </div>
            <p className="italic">{cert.provider}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Certifications;
