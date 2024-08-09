import PropTypes from "prop-types";

function Modal({ children }) {
  return (
    <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-black/25 px-6">
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
