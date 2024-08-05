import Grid2Layout from "../Components/Grid2Layout";
import H3 from "../Components/H3";
import ImageHero from "../Components/ImageHero";
import HeroHeading from "../Components/MainContent/HeroHeading";
import P from "../Components/P";
import img from "../assets/images/avenue-hero-img.png";
import mission from "../assets/images/mission.png";
import whatWeDo1 from "../assets/images/what-wedo1.png";
import whatWeDo2 from "../assets/images/what-wedo2.png";
import impact from "../assets/images/impact.png";
import involve from "../assets/images/involve.png";
import Container from "../Components/Container";
import ServiceHeading from "@/Components/ServiceHeading";

const AvenueImpactDevelopment = () => {
  return (
    <>
      <ImageHero imageSrc={img} className={"items-end lg:items-start"}>
        <div className="lg:mt-28">
          <div className="flex items-center gap-8 2xl:mb-32 2xl:mt-[225px]">
            <div className="hidden h-[3px] w-36 bg-white lg:block" />
            <ServiceHeading className="text-[40px] leading-10 md:leading-none lg:w-[671px] lg:text-[50px]">
              Avenue Impact Development CIC
            </ServiceHeading>
          </div>
          <div className="mb-8 mt-8 block h-[2px] w-full bg-white lg:hidden" />
          <p className="ml-auto mt-0 max-w-[45.375rem] font-poppins text-base font-light text-white md:text-lg lg:mt-28 lg:w-[666px] lg:text-lg 2xl:w-[45.375rem] 2xl:text-2xl">
            Avenue Impact Development CIC promotes good change and inspires
            young people to realise their greatest potential. As Avenue Impact{" "}
            {"Limited's"}
            social enterprise arm, we focus on youth empowerment initiatives in
            the UK and Nigeria to create opportunities for growth, development,
            and success.
          </p>
        </div>
      </ImageHero>
      <Container>
        <Grid2Layout className={"items-center gap-10 lg:gap-32"}>
          <div className="order-5 md:-order-1">
            <img
              src={mission}
              alt="two ladies sitting round a table"
              className="mx-auto block w-9/12 md:w-full lg:max-w-lg"
            />
          </div>

          <div className="order-1 md:order-5">
            <H3 className="mb-6 text-[24px] font-[400] lg:text-[40px]">
              Our Mission
            </H3>
            <P className="text-justify text-[16px] lg:text-[18px] 2xl:text-xl">
              We aim to empower young people via education, training, mentoring,
              and community involvement. We think every young person deserves
              the opportunity to grow and make meaningful societal
              contributions. We hope to inspire future leaders and change-makers
              by giving them the tools, resources, and support they need to
              realize their full potential.
            </P>
          </div>
        </Grid2Layout>
      </Container>
      <Container>
        <H3 className={"mb-6 text-[24px] font-[400] lg:text-[40px]"}>
          {" "}
          what we do
        </H3>

        <Grid2Layout className={"gap-y-6 md:gap-10 lg:gap-[62px]"}>
          <article className="space-y-4 md:space-y-6 lg:space-y-8">
            <img
              src={whatWeDo1}
              alt=" two and two women sitting round a table doing a meeting"
            />
            <P
              className={"text-justify text-[16px] lg:text-[18px] 2xl:text-xl"}
            >
              Education and Training Programmes: We provide a variety of
              educational and training programmes to help young people develop
              the skills, knowledge, and confidence they need to succeed in
              their personal and professional lives. We offer learning and
              development opportunities ranging from vocational training to
              entrepreneurship courses.
            </P>
            <P
              className={"text-justify text-[16px] lg:text-[18px] 2xl:text-xl"}
            >
              Youth Empowerment Projects: We initiate and support initiatives
              that enable young people to positively impact their communities.
              We endeavour to elevate young {"people's"} voices and
              contributions through youth-led initiatives, civic engagement, or
              social change advocacy.
            </P>
          </article>
          <article className="space-y-8">
            <P
              className={"text-justify text-[16px] lg:text-[18px] 2xl:text-xl"}
            >
              Mentorship and Coaching: Our mentorship and coaching programmes
              connect young people with experienced professionals who can offer
              guidance, advice, and support. Through individual mentoring
              sessions and group coaching activities, we assist young people in
              setting objectives, overcoming problems, and navigating their
              career pathways.
            </P>
            <P
              className={"text-justify text-[16px] lg:text-[18px] 2xl:text-xl"}
            >
              Community Engagement Initiatives: We actively engage with local
              communities to address social concerns, promote inclusiveness, and
              instil a feeling of belonging in young people. Our community
              projects and activities encourage cooperation, networking, and
              collective action.
            </P>
            <img src={whatWeDo2} alt="" className="w-full" />
          </article>
        </Grid2Layout>
      </Container>
      <Container>
        <Grid2Layout className={"items-center gap-y-6 md:gap-10 lg:gap-32"}>
          <section className="space-y-6 text-justify text-[16px] lg:text-[18px]">
            <H3 className="text-[24px] font-[400] lg:text-[40px]">
              Our Impact
            </H3>
            <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
              At Avenue Impact Development CIC, we define success as the impact
              we have on the lives of young people. Through our programmes and
              efforts, we have:
            </P>

            <ul className="ml-6 list-disc marker:text-[#667185]">
              <li>
                <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
                  Encouraged hundreds of young people to pursue their
                  aspirations and achieve their goals
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
                  Underprivileged adolescents gained access to education,
                  training, and mentorship opportunities.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
                  Supported youth-led initiatives and community projects to
                  solve social concerns.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
                  Developed a culture of cooperation, invention, and resilience
                  among young people.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px] 2xl:text-xl">
                  Inspired young leaders are generating positive change in their
                  communities.
                </P>
              </li>
            </ul>
          </section>
          <div>
            <img
              src={impact}
              alt=" an old man and three ladies sitting round a table"
              className="mx-auto block w-9/12 md:w-full lg:max-w-lg"
            />
          </div>
        </Grid2Layout>
      </Container>
      <Container>
        <Grid2Layout
          className={"items-center gap-y-6 text-justify md:gap-10 lg:gap-32"}
        >
          <div className="order-5 md:-order-1">
            <img
              src={involve}
              alt=" an old man and three ladies sitting round a table"
              className="mx-auto block w-9/12 md:w-full lg:max-w-lg"
            />
          </div>
          <section className="order-1 space-y-6 md:order-5">
            <H3 className="text-[24px] font-[400] lg:text-[40px]">
              Get involved
            </H3>
            <P className="text-[16px] lg:text-[18px]">
              Join us in our mission to empower youngsters and create a more
              promising future for the next generation. {"Here's"} how to get
              involved:
            </P>

            <ul className="ml-6 list-disc marker:text-[#667185]">
              <li>
                <P className="text-[16px] lg:text-[18px]">
                  Volunteer: Consider becoming a mentor, coach, or volunteer for
                  one of our programmes and initiatives.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px]">
                  Donate: Please support our efforts by donating or supporting a
                  young {"person's"} education or training.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px]">
                  Partner: Work with us on projects, events, or initiatives that
                  support our mission and values.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px]">
                  Spread the Word: Please share our message to help raise
                  awareness about the need of youth empowerment.
                </P>
              </li>
              <li>
                <P className="text-[16px] lg:text-[18px]">
                  Together, we can make a difference and create a world in which
                  every young person has a chance to succeed. Join us on our
                  path of empowerment and transformation!
                </P>
              </li>
            </ul>
          </section>
        </Grid2Layout>
      </Container>
    </>
  );
};

export default AvenueImpactDevelopment;
