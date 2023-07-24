function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");

    if (skills.style.display === "none") {
        skills.style.display = "block";
        member.style.display = "none";
        memberSkills.style.display = "none";
    } else {
        skills.style.display = "none";
        member.style.display = "block";
        memberSkills.style.display = "block";
    }
}