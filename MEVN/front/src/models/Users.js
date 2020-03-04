class Users{


    constructor(id, nombre, apellido, email, username, password, is_staff){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.username=username;
        this.password=password;
        this.is_staff=is_staff;
    }
}

export default Users;