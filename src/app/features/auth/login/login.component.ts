import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../core/models/auth-request.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../../../layout/sidebar/menu-dashboard/dashboard.service';

/**
 * Composant pour la page de connexion
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Soumet le formulaire de connexion
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const authRequest: AuthRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      
     this.authService.login(authRequest).subscribe({
  next: (response) => {
    this.isLoading = false;

    // Stocker l'utilisateur connecté dans le DashboardService
    this.dashboardService.setUser({
      nom: response.nom,
      prenom: response.prenom,
      role: response.role
    });

    // Affichage d'un toast succès
    this.toastr.success('Connexion réussie!', 'Bienvenue', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    });

    // Redirection vers le dashboard
    this.router.navigate(['/dashboard']);
  },
  error: (error: HttpErrorResponse) => {
    this.isLoading = false;

    console.log('Erreur complète:', error);

    let errorMessage = 'Email ou mot de passe incorrect';

    if (error.error && typeof error.error === 'object') {
      errorMessage = error.error.message || errorMessage;
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    }

    if (error.status === 401) {
      this.toastr.error(errorMessage, 'Erreur d\'authentification', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
    } else if (error.status === 0) {
      this.toastr.error('Impossible de se connecter au serveur', 'Erreur réseau', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
    } else {
      this.toastr.error(errorMessage, 'Erreur', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
    }
  }
});

    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs de validation
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
        
        // Afficher un toast pour le premier champ invalide
        if (control?.invalid && !control?.pristine) {
          this.showValidationError(key, control.errors);
        }
      });
      
      // Si le formulaire est vide, afficher un message général
      if (this.loginForm.pristine) {
        this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Formulaire incomplet', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true
        });
      }
    }
  }

  /**
   * Affiche les erreurs de validation via des toasts
   */
  private showValidationError(fieldName: string, errors: any): void {
    let message = '';
    
    switch(fieldName) {
      case 'email':
        if (errors?.['required']) {
          message = 'L\'adresse email est obligatoire';
        } else if (errors?.['email']) {
          message = 'Le format de l\'email est invalide';
        }
        break;
      case 'password':
        if (errors?.['required']) {
          message = 'Le mot de passe est obligatoire';
        } else if (errors?.['minlength']) {
          message = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        break;
    }
    
    if (message) {
      this.toastr.warning(message, 'Champ invalide', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true
      });
    }
  }

  /**
   * Affiche ou masque le mot de passe
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}