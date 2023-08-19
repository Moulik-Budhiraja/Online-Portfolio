import LogoutLink from "@/components/LogoutLink/LogoutLink";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="max-w-7xl mx-auto">
      {session && <LogoutLink session={session}></LogoutLink>}
      <main>
        <section className="min-h-screen flex items-center -mt-8">
          <div className="w-full flex justify-between mt-16 lg: lg:mt-4">
            <div className="my-12 lg:my-0 lg:mx-8 lg:max-w-3xl">
              <div className="gap-4 inline-block">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-neutral-100 whitespace-nowrap">
                  Hi, I&apos;m Moulik
                </h1>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-neutral-300 lg:text-center whitespace-nowrap">
                  Full Stack | Student
                </h2>
                <div className="flex h-8 gap-5 items-center mt-3 lg:justify-center">
                  <Link
                    href="mailto:moulikbudhiraja@gmail.com"
                    target="_blank"
                    className="h-full opacity-25 hover:opacity-100 transition-opacity duration-300 ease-out z-10"
                  >
                    <img
                      src="/images/mail.svg"
                      alt="gmail"
                      className="h-full"
                    />
                  </Link>
                  <Link
                    href="https://github.com/Moulik-Budhiraja"
                    target="_blank"
                    className="h-full opacity-25 hover:opacity-100 transition-opacity duration-300 ease-out z-10"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github"
                      className="h-full"
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/moulikbudhiraja/"
                    target="_blank"
                    className="h-full opacity-25 hover:opacity-100 transition-opacity duration-300 ease-out z-10"
                  >
                    <img
                      src="/images/linkedin.svg"
                      alt="linkedin"
                      className="h-full"
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/moulik_b/"
                    target="_blank"
                    className="h-full opacity-25 hover:opacity-100 transition-opacity duration-300 ease-out z-10"
                  >
                    <img
                      src="/images/instagram.svg"
                      alt="instagram"
                      className="h-full"
                    />
                  </Link>
                </div>
              </div>
              <div className="text-neutral-400 py-6 pl-8 max-w-3xl lg:pr-16 mt-12 border-neutral-100 border-l">
                <p>
                  I&apos;m an enthusiastic Software Engineering student at the
                  University of Guelph who is passionate about math, technology
                  and photography. I like to spend my free time working on
                  personal programming projects and learning new skills.
                  <br />
                  <br />
                  My experiences as a student, tutor and leader have taught me
                  that the best way to approach a difficult challenge is to dive
                  head-first into the deep end and learn as you go. I always
                  love seeking new opportunities to learn and grow as a
                  developer and a person.
                </p>
              </div>
            </div>
            <div className="hidden lg:block my-auto p-8">
              <h2 className="font-display text-5xl text-neutral-100 mb-6">
                Projects
              </h2>
              <ul className="p-8 flex flex-col gap-4 relative before:content-[''] before:w-12 before:h-12 before:top-1 before:left-0 before:absolute before:border-t before:border-l after:content-[''] after:w-12 after:h-12 after:bottom-1 after:right-0 after:absolute after:border-b after:border-r">
                <Link
                  href="#nail-braille"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">
                    Nail Braille
                  </li>
                </Link>
                <Link
                  href="https://github.com/Moulik-Budhiraja/Tank-Trample"
                  target="_blank"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">
                    Tank Trample
                  </li>
                </Link>
                <Link
                  href="https://github.com/Moulik-Budhiraja/Sprinkler-System"
                  target="_blank"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">
                    Irrigation Controller
                  </li>
                </Link>
                <Link
                  href="https://github.com/Moulik-Budhiraja/3D-Mapped-Christmas-Lights"
                  target="_blank"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">3D Lighting</li>
                </Link>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-display text-5xl text-neutral-100 mt-16">
            Projects
          </h2>
          <div>
            <div className="flex w-full aspect-square relative mb-12 after:content-[''] after:m-8 after:md:m-16 after:z-0 after:w-full after:bg-gradient-to-b after:from-transparent after:to-neutral-800 md:aspect-unset lg:mb-0 md:h-160 lg:w-full">
              <img
                className="absolute w-full h-full object-cover p-8 md:p-16 md:w-full"
                src="images/nail-braille/Summary Image.jpg"
                alt="Nail Braille Title Image"
              />
            </div>
            <div className="relative -top-40">
              <h3 className="font-display text-4xl text-neutral-100">
                Nail Braille
              </h3>
              <h6 className="font-display text-xl text-neutral-500">
                <Link
                  href="https://projectboard.world/ysc/project/nail-braille-a-novel-approach-towards-braille-education-gnzdel"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  PROJECTBOARD
                </Link>
                {" | "}
                <Link
                  href="https://github.com/Moulik-Budhiraja/Nail-Braille"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  GITHUB
                </Link>
              </h6>
              <p className="text-neutral-400 pl-4 max-w-sm">
                Nail Braille is a device designed, prototyped and tested in
                collaboration with{" "}
                <span
                  className="text-sky-600 cursor-pointer relative inline-block transition-colors duration-300 ease-out hover:text-sky-500 focus-within:text-sky-500 group/pop-over"
                  tabIndex={0}
                >
                  Katelyn Wu
                  <span className="w-28 left-1/2 -top-20 absolute flex bg-neutral-900 gap-4 p-4 rounded-md border-2 border-neutral-800 -translate-x-1/2 -translate-y-1/3 opacity-0 pointer-events-none group-hover/pop-over:opacity-100 group-hover/pop-over:translate-y-0 group-hover/pop-over:pointer-events-auto group-active/pop-over:opacity-100 group-active/pop-over:translate-y-0 group-active/pop-over:pointer-events-auto transition-all duration-300 ease-out before:content-[''] before:absolute before:h-[150%] before:w-full before:top-0 before:left-0 after:content-[''] after:absolute after:h-4 after:w-4 after:bg-neutral-900 after:rotate-45 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2">
                    <Link
                      href="mailto:katelynatwu@gmail.com"
                      target="_blank"
                      className="opacity-20 hover:opacity-100 transition-all duration-300 ease-out z-10"
                    >
                      <img
                        src="/images/mail.svg"
                        alt="gmail"
                        className="h-8 w-8"
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/katelyn-wu-5a1076231/"
                      target="_blank"
                      className="opacity-20 hover:opacity-100 transition-all duration-300 ease-out z-10"
                    >
                      <img
                        src="/images/linkedin.svg"
                        alt="linkedin"
                        className="h-8 w-8"
                      />
                    </Link>
                  </span>
                </span>{" "}
                to help the visually impaired learn braille in a way that
                minimizes cost and maximizes independence. <br />
                <br />
                This project earned the platinum award at the 2023 Canada Wide
                Science Fair.{" "}
                <Link
                  href="/blogs/my-science-fair-experience"
                  className="text-sky-600 hover:text-sky-500 transition-colors duration-300 ease-out"
                >
                  Read more...
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
