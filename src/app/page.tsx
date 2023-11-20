import LinkButton from "@/components/LinkButton/LinkButton";
import LinkNav from "@/components/LinkNav/LinkNav";
import LogoutLink from "@/components/LogoutLink/LogoutLink";
import { getSessionUser } from "@/serverFunctions/user/getSessionUser";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "./experiences.css";

export default async function Home() {
  const session = await getServerSession();
  let user;

  if (session?.user?.email) {
    user = await getSessionUser();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="absolute top-4 right-8 flex gap-4">
        {user?.role === "ADMIN" && <LinkNav href="/admin">Admin</LinkNav>}
        <LinkNav href="/blogs">Blog</LinkNav>
        {session ? (
          <LogoutLink session={session}></LogoutLink>
        ) : (
          <>
            <LinkNav href="auth/login">Login</LinkNav>
            <LinkNav href="auth/signup">Sign up</LinkNav>
          </>
        )}
      </div>
      <main>
        <section className="min-h-screen flex items-center -mt-8">
          <div className="w-full flex justify-between mt-16 lg: lg:mt-4">
            <div className="my-12 lg:my-0 lg:mx-8 lg:max-w-3xl">
              <div className="gap-4 inline-block">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-neutral-100 whitespace-nowrap">
                  Hi, I&apos;m Moulik
                </h1>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-neutral-300 lg:text-center whitespace-nowrap">
                  Student | Full Stack
                </h2>
                <div className="flex h-8 gap-5 items-center mt-3 lg:justify-center">
                  <Link
                    href="mailto:contact@moulikbudhiraja.com"
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
                  href="#event-dashboard"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">
                    Event Dashboard
                  </li>
                </Link>
                <Link
                  href="#hawkeye"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">Hawkeye</li>
                </Link>

                <Link
                  href="#irrigation-controller"
                  className="text-neutral-400 hover:text-neutral-100 text-2xl transition-colors duration-300 ease-out"
                >
                  <li className="whitespace-nowrap text-center">
                    Irrigation Controller
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-display text-5xl text-neutral-100 mt-16">
            Projects
          </h2>
          <div className="relative mt-8 mb-52 px-4 flex flex-col">
            <div className="flex w-full aspect-square relative mb-12 md:aspect-unset max-w-3xl lg:mx-16">
              <img
                className="object-cover -z-10"
                src="images/nail-braille/Summary Image.jpg"
                alt="Nail Braille Title Image"
                id="nail-braille"
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-neutral-800"></div>
            </div>
            <div className="absolute -bottom-20 left-0">
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

          <div className="relative mt-8 mb-52 px-4 flex flex-col items-end">
            <div className="flex w-full aspect-square relative mb-12 md:aspect-unset max-w-3xl lg:mx-16">
              <img
                className="object-cover -z-10"
                src="images/event-dashboard/landing.png"
                alt="Event Dashboard Title Image"
                id="event-dashboard"
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-neutral-800"></div>
            </div>
            <div className="absolute -bottom-20 right-0 text-right">
              <h3 className="font-display text-4xl text-neutral-100">
                Event Dashboard
              </h3>
              <h6 className="font-display text-xl text-neutral-500">
                <Link
                  href="https://www.tedxcolumbialakeyouth.com/"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  EVENT SITE
                </Link>
                {" | "}
                <Link
                  href="https://github.com/Moulik-Budhiraja/TEDxColumbia-Lake-Youth-Dashboard"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  GITHUB
                </Link>
              </h6>
              <p className="text-neutral-400 pl-4 max-w-sm">
                This event dashboard was designed and developed for the 2023
                TEDx Columbia Lake Youth event. It allowed attendees to RSVP,
                view their ticket, and network with others at the event. Also
                allowing organizers to manage attendees, send emails, and
                validate tickets.
              </p>
            </div>
          </div>

          <div className="relative mt-8 mb-52 px-4 flex flex-col">
            <div className="flex w-full aspect-square relative mb-12 md:aspect-unset max-w-3xl lg:mx-16">
              <img
                className="object-cover -z-10"
                src="images/hawkeye/landing.png"
                alt="Hawkeye Landing Image"
                id="hawkeye"
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-neutral-800"></div>
            </div>
            <div className="absolute -bottom-20 left-0">
              <h3 className="font-display text-4xl text-neutral-100">
                Hawkeye
              </h3>
              <h6 className="font-display text-xl text-neutral-500">
                <Link
                  href="https://devpost.com/software/hawkeye-amc4n7"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  DEVPOST
                </Link>
                {" | "}
                <Link
                  href="https://github.com/Moulik-Budhiraja/HawkEye"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  GITHUB
                </Link>
              </h6>
              <p className="text-neutral-400 pl-4 max-w-sm">
                Hawkeye is a project that helps people with visual impairments
                visualize the world around them. It uses the AdHawk MindLink to
                provide essential visual information to the blind and visually
                impaired. Our application offers a wide range of functions.
              </p>
            </div>
          </div>

          <div className="relative mt-8 mb-40 px-4 flex flex-col items-end">
            <div className="flex w-full aspect-square relative mb-12 md:aspect-unset max-w-3xl lg:mx-16">
              <img
                className="object-cover -z-10"
                src="images/irrigation-controller/lawn.jpg"
                alt="Irrigation Controller Title Image"
                id="irrigation-controller"
              />
              <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-neutral-800"></div>
            </div>
            <div className="absolute -bottom-20 right-0 text-right">
              <h3 className="font-display text-4xl text-neutral-100">
                Irrigation Controller
              </h3>
              <h6 className="font-display text-xl text-neutral-500">
                <Link
                  href="https://github.com/Moulik-Budhiraja/Sprinkler-System"
                  target="_blank"
                  className="hover:text-neutral-100 transition-colors duration-300 ease-out"
                >
                  GITHUB
                </Link>
              </h6>
              <p className="text-neutral-400 pl-4 max-w-sm">
                With just an ESP32, a few relays, and solenoid valves, this
                sprinkler system can be used to automate the watering of your
                lawn. Through its mobile friendly web interface, you can
                schedule watering times, view and add to the task queue, and see
                the past watering history.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <LinkButton
              href="https://github.com/Moulik-Budhiraja?tab=repositories"
              target="_blank"
            >
              See More Projects on Github
            </LinkButton>
          </div>
        </section>
        <section>
          <h2 className="font-display text-5xl text-neutral-100 mt-16">
            Experiences
          </h2>
          <div className="py-8 md:px-12 md:my-8">
            <div className="flex flex-col gap-8 border-l p-8 pr-0 relative experiences">
              <div className="group/exp w-fit">
                <h3 className="font-display text-2xl text-neutral-200 relative before:content-[''] before:w-4 before:h-4 before:border before:bg-neutral-850 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-10">
                  Website Manager & Full Stack Developer
                </h3>
                <h4 className="text-neutral-500 text-sm">
                  ReSEC Lab @ Wilfred Laurier University
                </h4>
                <div className="text-neutral-600 text-xs">
                  Aug 2023 - Present
                </div>

                <ul className="list-disc opacity-0 transition-opacity duration-300 ease-out xl:group-hover/exp:opacity-100 absolute w-1/2 right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <li>
                    Migrated web app towards modern infrastructure using AWS
                  </li>
                  <li>Optimized databases to improve app performance</li>
                  <li>
                    Increased site performance by optimizing core functions
                  </li>
                  <li>Setup CI/CD flow for fast iterative development</li>
                </ul>
              </div>
              <div className="group/exp w-fit">
                <h3 className="font-display text-2xl text-neutral-200 relative before:content-[''] before:w-4 before:h-4 before:border before:bg-neutral-850 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-10">
                  Tech & Co-Head of Production
                </h3>
                <h4 className="text-neutral-500 text-sm">
                  TEDx Columbia Lake Youth
                </h4>
                <div className="text-neutral-600 text-xs">
                  Sep 2023 - Present
                </div>
                <ul className="list-disc opacity-0 transition-opacity duration-300 ease-out xl:group-hover/exp:opacity-100 absolute w-1/2 right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <li>
                    Designed a mobile-friendly user dashboard for 150+ users:
                    organizers, speakers, and attendees.
                  </li>
                  <li>Integrated authentication for secure access.</li>
                  <li>
                    Enabled RSVP, digital networking, and ticket viewing for
                    attendees.
                  </li>
                  <li>
                    Provided user management, badge linking, and RSVP tracking
                    for organizers.
                  </li>
                  <li>
                    Utilized Nextjs, SQL, Docker, and AWS for development and
                    deployment.
                  </li>
                </ul>
              </div>
              <div className="default-hover">
                Hover over an experience to see more details
              </div>
              <div className="group/exp w-fit">
                <h3 className="font-display text-2xl text-neutral-200 relative before:content-[''] before:w-4 before:h-4 before:border before:bg-neutral-850 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-10">
                  Judge & Mentor
                </h3>
                <h4 className="text-neutral-500 text-sm">RythmHacks</h4>
                <div className="text-neutral-600 text-xs">Sep 2023</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <LinkButton
              href="https://www.linkedin.com/in/moulikbudhiraja/#experience"
              target="_blank"
            >
              See All Experiences on Linkedin
            </LinkButton>
          </div>
        </section>
        <section className="h-[calc(100vh-4rem)] relative">
          <h2 className="font-display text-5xl text-neutral-100 mt-16">
            Contact
          </h2>
          <div className="my-12 flex flex-col items-center md:flex-row md:gap-16 md:justify-center absolute w-full top-1/2 -translate-y-[calc(50%+4rem)]">
            <div className="aspect-square rounded-full overflow-hidden w-32 md:w-60">
              <img
                className="object-cover"
                src="/images/profile/profile-pic.jpg"
                alt="Profile Photo"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-display text-neutral-300 text-3xl md:text-5xl mt-2">
                Moulik Budhiraja
              </h3>
              <p className="max-w-[11rem] text-center">
                Feel free to reach out, I'd love to connect!
              </p>
              <div className="flex h-8 gap-5 items-center mt-3 lg:justify-center">
                <Link
                  href="mailto:contact@moulikbudhiraja.com"
                  target="_blank"
                  className="h-full opacity-25 hover:opacity-100 transition-opacity duration-300 ease-out z-10"
                >
                  <img src="/images/mail.svg" alt="gmail" className="h-full" />
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
          </div>
        </section>
      </main>
    </div>
  );
}
