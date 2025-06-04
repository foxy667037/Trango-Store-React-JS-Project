import './loader.css';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="loader">
        <div className="loader-inner"></div>
      </div>
    </div>
  );
};

export default Loader;