const Contact = ({ projectsArr }) => {
  return (
    <section id="contact">
      <div className="lg:px-10 flex flex-col gap-10">
        <h1 className="my-0 mx-auto text-accent text-xl md:text-3xl lg:text-4xl font-OrbitronBold">
          <strong>Projects I have Built</strong>{' '}
          <b className="text-primary">/</b> <strong>Contributed to</strong>
        </h1>
      </div>
    </section>
  );
};

export default Contact;
