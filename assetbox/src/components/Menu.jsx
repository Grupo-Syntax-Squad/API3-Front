
export default function Menu(props) {
  return (
    <div>
      <header class="custom-background">
      <ul class="is-flex is-justify-content-space-around py-3 m-auto">
        <div class="is-flex">
          {/* <img class="image is-48x48" src={Logo} alt=""/> */}
            <p class="has-text-white is-flex pt-5 is-size-5">EMPRESA</p>
        </div>
            <li><a href="#" class="has-text-white is-size-5-desktop"><i class="fas fa-desktop mr-2 pt-5"></i>Ativos</a></li>
            <li><p class="has-text-white is-size-5-desktop"><i class="fas fa-wrench mr-2 pt-5"></i>Manutenções</p></li>
            <li><p class="has-text-white is-size-5-desktop"><i class="fas fa-user mr-2 pt-5"></i>Usuários</p></li>
            <li><p class="has-text-white is-size-5-desktop"><i class="fas fa-chart-bar mr-2 pt-5"></i>Dashboard</p></li>
            <i class="fas fa-cog is-justify-content-flex-end has-text-white is-size-5-desktop py-2 pt-5"></i>
        </ul>
        </header>
    </div>
  );
}