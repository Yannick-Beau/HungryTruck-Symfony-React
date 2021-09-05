import { connect } from 'react-redux';

// on importe le composant de présentation
import Nav from 'src/components/Nav';
import { changeHiddenNavBar } from '../../actions/tools';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state

  // Formualire de création d'un user
  hiddenNavBar: state.tools.hiddenNavBar,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  changeHiddenNavBar: () => {
    const action = changeHiddenNavBar();
    dispatch(action);
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
