$(function () {
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
          <div>
            <header><h1>Instacollections!</h1></header>
            {this.props.children}
          </div>
      );
    }
  });

  var routes = (
    <Route path='/' component={App}>
      <IndexRoute component={CollectionIndex}/>
      <Route path='collections/new' component={CollectionForm}/>
      <Route path='collections/:collectionId' component={CollectionShow}/>
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);
});
