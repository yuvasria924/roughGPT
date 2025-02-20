<script>

    let searchQuery = "";

    function handleSearch() {
    console.log("Searching for:", searchQuery);
  }
  </script>
  
  <main class="container">
    <div class="search-container">
      <input 
        type="text" 
        bind:value={searchQuery} 
        placeholder="Search..." 
        class="search-bar"
      />
      <button on:click={handleSearch} class="search-icon">🔍</button>
    </div>

    <button class="floating-btn" >+</button>

  </main>
  
  <style>
    main {
      text-align: center;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }

    .search-container {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: .5rem auto 0;
    width: 70vw;
    max-width: 70vw;
    height: 80vh;
    background: linear-gradient(135deg, #cc7229, #64441a, #ca6f19, #995e27);
    background-size: 300% 300%;
    animation: gradientAnimation 4s ease infinite;
    border-radius: 1.4rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  .search-bar {
    width: 50vw;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }
  .search-icon {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
  }
  .search-icon:hover {
    background: #0056b3;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;

  }       

  .floating-btn {
    position: absolute;
    bottom: 6%;
    right: 13%;
    width: 60px;
    height: 60px;
    background: #000000;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease, transform 0.2s ease;
  }
  .floating-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
   .container {
	 padding: 1.5rem;
   }
   .floating-btn {
    right: 10%;
  }
}

  </style>
  