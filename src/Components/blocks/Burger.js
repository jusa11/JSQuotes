const Burger = ({ isActive, className, onClick }) => {
	
  return (
    <div
      className={`${className} ${isActive ? 'active' : ''} burger`}
      onClick={onClick}
    >
      <span></span>
    </div>
  );
};

export default Burger;
