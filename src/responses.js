const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 200, responseXML, acceptedType);
  } else {
    const responseJSON = {
      message: 'This is a successful response',
    };

    respond(request, response, 200, JSON.stringify(responseJSON), acceptedType);
  }
};

const badRequest = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';

    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, acceptedType);
    }

    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, acceptedType);
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, JSON.stringify(responseJSON), acceptedType);
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), acceptedType);
};

const unauthorized = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';

    if (!params.loggedIn || params.loggedIn !== 'true') {
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, acceptedType);
    }

    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, acceptedType);
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, JSON.stringify(responseJSON), acceptedType);
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), acceptedType);
};

const forbidden = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content.</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 403, responseXML, acceptedType);
  } else {
    const responseJSON = {
      message: 'You do not have access to this content.',
    };

    respond(request, response, 403, JSON.stringify(responseJSON), acceptedType);
  }
};

const internal = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong.</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 500, responseXML, acceptedType);
  } else {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
    };

    respond(request, response, 500, JSON.stringify(responseJSON), acceptedType);
  }
};

const notImplemented = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 501, responseXML, acceptedType);
  } else {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    };

    respond(request, response, 501, JSON.stringify(responseJSON), acceptedType);
  }
};

const notFound = (request, response, params, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    respond(request, response, 404, responseXML, acceptedType);
  } else {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    respond(request, response, 404, JSON.stringify(responseJSON), acceptedType);
  }
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
