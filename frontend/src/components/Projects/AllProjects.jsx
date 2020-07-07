import React from "react";

const AllProjects = (props) => (
  <div className="container">
    <header className="jumbotron">
      <div className="container">
        <h1>Project List</h1>
        <p>
          <a className="btn btn-primary btn-lg" href="/destinations/new">Add New Destination</a>
        </p>
      </div>
    </header>

    <div className="row text-center">
        { 
          for (var dest of destinations){ 
          <div class="col-md-4 col-sm-6">
            <div class="thumbnail">
              <img src=<%=dest.image%> />
              <div class="caption">
                <h4><%=dest.name%></h4>
                <p><%=dest.state%>, <%=dest.country%></p>
                <p><a href="/destinations/<%=dest._id%>" class="btn btn-primary">More info</a></p>
              </div>
            </div>
          </div>
        <% } %>
    </div>
  </div>  <!-- end of "container"> -->

)

export default AllProjects;