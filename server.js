var express = require( 'express' ),
  app = express(),
  port = process.env.PORT || 3000;

var ibmdb = require( 'ibm_db' );

app.listen( port );

console.log( 'Start API server on: ' + port );

app.get( '/listUsers', function ( req, res ){
  res.setHeader( 'Content-Type', 'application/json' );
  var dbConnString = process.env.DBSTRING;
  ibmdb.open( dbConnString, function( err, conn ){
    if( err ){
      console.error( "Error: ", err );
      result = "NoConn";
    }else{
      var query = "SELECT * FROM PLAN";
      conn.query( query, function( err, rows ){
        if( err ){
          console.log( "Error: ", err );
          return;
        }else{
          if( rows === "[]" ){
            result = "NoData";
          }else{
            //console.log( rows );
            res.send( rows );
          }
          conn.close( function(){
            console.log( "Connection closed successfully." );
          } );
        }
      } );
    }
  } );
} );

app.get( '/:id', function ( req, res ){
  res.setHeader( 'Content-Type', 'application/json' );
  var dbConnString = process.env.DBSTRING;
  ibmdb.open( dbConnString, function( err, conn ){
    if( err ){
      console.error( "Error: ", err );
      result = "NoConn";
    }else{
      var query = "SELECT * FROM PLAN WHERE TELEFONO = ";
      console.log( req.params.id );
      query = query.concat( req.params.id );
      conn.query( query, function( err, rows ){
        if( err ){
          console.log( "Error: ", err );
          return;
        }else{
          if( rows === "[]" ){
            result = "NoData";
          }else{
            //console.log( rows );
            res.send( rows );
          }
          conn.close( function(){
            console.log( "Connection closed successfully." );
          } );
        }
      } );
    }
  } );
} );
