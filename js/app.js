document.getElementById("search").addEventListener("click", function () {

        ///////Take input(pokemon name/id)
        let input = document.getElementById("input").value;
        console.log(input);
        fetch("https://pokeapi.co/api/v2/pokemon/" + input)

            .then(function (response) {
                if (response.ok === false) {
                    throw('Pokemon Dont Exist');
                }
                return response.json();
            })

            .then(data => {
                console.log(data);
                let name = data.name;
                let pokeID = data.id;
                let pokeImgSrc = data.sprites.front_default;

                document.getElementById("pokemonImg").src = pokeImgSrc ;
                document.getElementById("name").innerHTML = " Name: " + name +"<br>"+ "ID: " + pokeID ;
                document.getElementById("move").innerHTML = "Moves: "+"<br>" + data.moves[0].move.name
                                                                              +"<br>" + data.moves[1].move.name
                                                                              +"<br>" + data.moves[2].move.name
                                                                              + "<br>" + data.moves[3].move.name;
                console.log("pokeImgSrc", data.sprites.front_default);
                console.log("url for 2nd Fetch : ", data.species.url);
                return fetch (data.species.url)
            })


            /////////the second fetch to get the prev-evolution
            .then(function (response) {
                if (response.ok === false) {
                    throw ('2nd error')
                }
                return response.json();
            })

            .then(data => {
                console.log('second fetch: ',data);
                let prevEvolution = data.evolves_from_species;
                console.log('prevEvolution', prevEvolution);

                if (prevEvolution === null) {
                    document.getElementById("prevEvo").innerHTML = "none"
                }else{
                    //console.log('No prevEvolution');
                    let prev_url = prevEvolution.url.split('/');
                     console.log("prev_url", prev_url);
                    let prev_id = prev_url[prev_url.length-2];
                     console.log("prev_id", prev_id);

                    document.getElementById("prevEvo").innerHTML = prevEvolution.name;
                    //console.log('PrevEvolution: ', prevEvolution);
                    // console.log('PrevEvolution Name: ', prevEvolution.name);
                    return fetch("https://pokeapi.co/api/v2/pokemon/"+prev_id)

                }

            })
            /////// 3rd fetch
            .then(function (response) {
                if (response.ok === false) {
                    throw('3rd fetch error');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                let prevImgSrc = data.sprites.front_default;
                 console.log(prevImgSrc);
                document.getElementById("prevEvoImg").src = prevImgSrc;
            })

            .catch(function (error) {
                alert(error);
            })





});