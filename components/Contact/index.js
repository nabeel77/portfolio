import globalDesigns from '../../staticData/globalDesigns';
import useContact from '../hooks/useContact';
import Input from '../input';
import Popup from '../Popup';
import popupIcons from '../../staticData/popupIcons';

const Contact = () => {
  const {
    formState,
    inputHandler,
    isShowing,
    popupState,
    hidePopup,
    emailSent,
    handleSendMessage,
  } = useContact();

  return (
    <section id="contact">
      <Popup
        isShowing={isShowing}
        state={popupIcons[popupState.state]}
        hide={hidePopup}
        message={popupState.message}
      />
      <div className="lg:px-10 flex flex-col gap-5">
        <h1 className="my-0 mx-auto text-accent text-xl md:text-3xl lg:text-4xl font-OrbitronBold">
          Contact me
        </h1>
        <h3 className={`${globalDesigns.responsiveFontStyles} my-0 mx-auto`}>
          I am available for any inquiries regarding work opportunities,
          creative ideas, constructive feedback, or questions. I will make every
          effort to respond promptly.
        </h3>
        <div className="p-5 w-full flex flex-col justify-center items-center gap-4">
          <Input
            id="name"
            element="input"
            type="text"
            placeholder="Your name"
            onInput={inputHandler}
            sent={emailSent}
            value={formState.inputs.name.value}
            classNames="input input-bordered w-full lg:w-60 "
          />

          <Input
            id="email"
            element="input"
            type="email"
            placeholder="Your email address"
            onInput={inputHandler}
            sent={emailSent}
            value={formState.inputs.email.value}
            classNames="input input-bordered w-full lg:w-60"
          />

          <Input
            id="message"
            element="text-area"
            type="text"
            onInput={inputHandler}
            placeholder="Your message"
            sent={emailSent}
            value={formState.inputs.message.value}
            classNames="input input-bordered w-full lg:w-60 py-3"
          />
          <button
            className="btn bg-primary"
            onClick={(e) => handleSendMessage(e, formState)}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
